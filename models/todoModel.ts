import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    completed:{
        type: Boolean,
        default: false,
        required: true,
    },
})


// const Todo = mongoose.model('Todo', todoSchema)

const Todo = mongoose.models.Todo ?? mongoose.model("Todo", todoSchema);

export default Todo;  