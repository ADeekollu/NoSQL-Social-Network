



const { User, Thought } = require("../models")

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: "reaction",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reaction",
                select: "-__v"
            })
            .select("-__v")
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No Thought with this ID found"})
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: { thoughts: _id }},
                    { new: true}
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "Thought created but no user with ID found"})
                }
                res.json({ message: "Thought Created"})
            })
            .catch((err) => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, body, {                
                new: true,
                runValidators: true,
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No Thought with this ID found"})
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));                   
           
    },

    deleteThought({ params }, res) {
        Thought.findOneAndRemove({_id: params.id})
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: "No user found"})
        }
        return User.findOneAndUpdate(
            { thoughts: params.id},
            { $pull: { thoughts: params.id}},
            { new: true }
        );        
        })  
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Thought deleted"})
            }
            res.json({ message: "Thought Created"});
        })        
        .catch((err) => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true}
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
             res.status(404).json({ message: "No Thought with ID found"})
             return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: params.reactionId }},
            { new: true }
        )
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => res.json(err));
    },
};



module.exports = thoughtController;

