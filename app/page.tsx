"use client"

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';


export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const pathname = usePathname();

    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Registering: ", { name, email, password })

        const response = await fetch('/api/register', {
            credentials: 'include', // for other site like when frontend is on 3000 and backend is on 4000
            method: "POST",
            body: JSON.stringify({ name, email, password })
        })
        const data = await response.json();

        if (!response.ok) {
            return toast.error(data.message)
        }

        toast.success(data.message);
        router.push('/login')
    }

    return (


        <form onSubmit={handleRegister} className="max-w-md mx-auto p-6 bg-base-100 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            {/* Name */}
            <div>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* Email */}
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-full">
                Sign Up
            </button>
            <p className='text-sm'>Already have an account? <Link href='/login' className={pathname === '/login' ? 'btn btn-primary' : 'text-blue-500 glass'}>Login</Link></p>
        </form>
    )
}