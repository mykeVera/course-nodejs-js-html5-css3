const Users = require('./user.model');

const User = {
    get: async (req,res) => {
        const id = req.params.id;
        const user = await Users.findOne({_id: id});
        res.status(200).send(user);
    },
    list: async (req,res) => {
        const users = await Users.find();
        res.status(200).send(users);
    },
    create: async (req,res) => {
        const user = new Users(req.body);
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    },
    update: async (req,res) => {
        const id = req.params.id;
        const user = await Users.findOne({_id: id});
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    },
    destroy: async (req,res) => {
        const id = req.params.id;
        const user = await Users.findOne({_id: id});
        if(user) await user.deleteOne();
        res.status(200).send(user);
    }
}

module.exports = User;
