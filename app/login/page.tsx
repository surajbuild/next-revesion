"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Form from "next/form"
import toast from "react-hot-toast"

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('LOGGING... ', { email, password });

        const response = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify({ email, password })
        })
        console.log('response', response)
        const data = await response.json();
        console.log(data);
        console.log('res.ok', response.ok)

        if (response.ok) {
            router.push('/todos');
        }
        else {
            toast.error('Incorrect password or email')
        }
    }
    return (
        <div>
            <Form action="" onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-base-100 rounded-xl shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <label className="label">
                    <span className="lable-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="label">
                    <span className="lable-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>
            </Form>
        </div>
    )
}

export default page
