const UserModel = require("../models/UsersModel")

const UserController = {
    
    getAllUser: async (req, res) => {
        try {
            const user = await UserModel.find();
            res.status(200).json(user)
        }
        catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // create user (register)
    createUser: async (req, res) => {
        try {
            const newUser = {
                email: req.body.email,
                avatar: req.file ? req.file.path : '',
                phone: req.body.phone,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                password: req.body.password,
                confirm: req.body.confirm,

            };
            const user = new UserModel(newUser);
            await user.save();
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ err: e })
            console.log(res)
        }
    },

    // update user
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const existingUser = await UserModel.findById(userId);

            if (!existingUser) {
                return res.status(404).json({ err: 'User not found' });
            }

            const userUpdate = {
                email: req.body.email,
                phone: req.body.phone,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                password: req.body.password,
                confirm: req.body.confirm,
            };

            // Chỉ cập nhật avatar nếu có ảnh mới
            if (req.file) {
                userUpdate.avatar = req.file.path;
            } else {
                userUpdate.avatar = existingUser.avatar;
            }

            const query = { _id: userId };
            const options = { new: true };
            const result = await UserModel.findOneAndUpdate(query, userUpdate, options);

            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const itemDelete = await UserModel.findByIdAndDelete(userId);
            if (!itemDelete) {
                return res.status(404).json({ err: 'User not found' });
            }
            res.status(200).json(itemDelete);
        } catch (e) {
            res.status(500).json({ err: e.message });
        }
    },

    // Search
    searchUser: async (req, res) => {
        try {
            const firstname = req.query.firstname;
            const role = req.query.role;

            const query = {};
            if (firstname) {
                query.firstname = { $regex: firstname, $options: "i" };
            }
            if (role) {
                query.role = role; 
            }

            const users = await UserModel.find(query);
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({ err: e.message });
        }
    },
}

module.exports = UserController