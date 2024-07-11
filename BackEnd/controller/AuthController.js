const jwt = require("jsonwebtoken")
const UsersModel = require("../models/UsersModel")

let refreshTokenArr = [];

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            process.env.JWT_ACCESS_KEY, { expiresIn: "1d" }
        )
    },

    generateRefreshTokenAAA: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFRESH_KEY, { expiresIn: "365d" }
        )
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UsersModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (password !== user.password) {
                return res.status(401).json({ message: "Wrong password" });
            }

            // Tạo access token và refresh token
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshTokenAAA(user);

            // Xóa các refresh token cũ của người dùng trước khi thêm token mới vào mảng
            refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken);
            refreshTokenArr.push(refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Strict",
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ user, accessToken, refreshToken });
        } catch (e) {
            console.error("Error while logging in user", e.message);
            res.status(500).json({ err: e.message });
        }
    },


    // LOGOUT
    logoutUser: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        refreshTokenArr = refreshTokenArr.filter(token => token !== refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json("Logout success !");
    },

    requestRefeshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json("Refresh token is not valid");
            }

            // Nếu có refresh token mới rồi lọc cái cũ ra
            refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);

            // Tạo mới một accessToken và refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshTokenAAA(user);
            refreshTokenArr.push(newRefreshToken);

    
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "Strict",
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    },
}

module.exports = authController