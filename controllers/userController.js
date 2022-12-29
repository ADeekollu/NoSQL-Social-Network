

const { User, Thought } = require("../models")

const userController = {
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate("Thought")
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            {new: true}
            )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },
    deleteUser({ params }, res) {
        User.findOneAndRemove(
            {_id: params.id}           

        )
        .then((User) => 
        !User
        ?res.status(404).json({ message: "No user found"})
        :res.status(200).json({ message: "User found and deleted"})
        )  
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
        
    }
}

module.exports = userController;

