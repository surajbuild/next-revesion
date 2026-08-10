//EDIT IS NOT WORKING HERE
"use client"



import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const TodoPage = () => {
    const router = useRouter();

    const [todo, setTodo] = useState([]);
    const [editTodo, setEditTodo] = useState({ title: "", completed: false });
    console.log(Array.isArray(todo))
    console.log('todo', todo);

    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        const response = await fetch('/api/todos')

        if (response.status === 400) {
            router.push('/login')
            return toast.error('User not logged in')
        }

        console.log('response', response)
        const data = await response.json();
        console.log("Is array", Array.isArray(data))
        console.log(data);
        setTodo(data)
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const addTodo = async (title) => {
        console.log('title', title)
        const response = await fetch('/api/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
        console.log('response', response);
        const createdTodo = await response.json();
        console.log('newTodo', createdTodo)


        setTodo((prev) => [...prev, createdTodo])
        setNewTodo('');
        console.log('set new todo called')
        console.log(response)
    }



    const deleteTodo = async (id) => {
        const response = await fetch(`/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(response);
        fetchTodos();
    }

    const updateTodo = async (id) => {
        console.log("UPDATE CALLED")
        const response = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editTodo)
        })

        const updatedTodo = await response.json();
        console.log("updatedTodo", updatedTodo);
        if (fetchTodos) {
            fetchTodos();
        }
        // setEditTodo(editTodo)

    }




    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 py-10">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-10 rounded-3xl bg-white p-8 shadow-xl">
                    <h1 className="text-center text-4xl font-extrabold text-gray-800">
                        📝 My Todo List
                    </h1>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            value={newTodo}
                            placeholder="What do you want to do today?"
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black"
                        />

                        <button
                            onClick={() => addTodo(newTodo)}
                            className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 active:scale-95"
                        >
                            Add Todo
                        </button>
                    </div>
                </div>

                <div className="space-y-5">
                    {todo.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {item.title}
                                    </h2>

                                    <p
                                        className={`mt-1 text-sm font-medium ${item.completed
                                                ? "text-green-600"
                                                : "text-orange-500"
                                            }`}
                                    >
                                        {item.completed
                                            ? "✅ Completed"
                                            : "⏳ Pending"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deleteTodo(item.id)}
                                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
                                >
                                    Delete
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="text"
                                    defaultValue={item.title}
                                    placeholder="Edit todo..."
                                    onChange={(e) =>
                                        setEditTodo({
                                            ...item,
                                            title: e.target.value,
                                        })
                                    }
                                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black"
                                />

                                <button
                                    onClick={() => updateTodo(item.id)}
                                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoPage
