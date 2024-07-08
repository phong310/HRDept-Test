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
            const userUpdate = {
                email: req.body.email,
                avatar: req.file ? req.file.path : '',
                phone: req.body.phone,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                password: req.body.password,
                confirm: req.body.confirm,
            };
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
}

module.exports = UserController