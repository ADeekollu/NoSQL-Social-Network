

const { Schema, model} = require('mongoose');


const reactionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp)
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId(),            

        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
        reaction: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }    
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
})

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;
