"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';


export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState('');

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetchUser();
    }, [])

    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Registering: ", { name, email })

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

    async function fetchUser() {
        console.log('inside fetch user')
        const response = await fetch('/api/user')
        const data = await response.json();
        console.log('data', data)
        if(!response.ok) {
            return router.push('/login')
        }
        if(!data.error) {
            setUser(data.user)
        }

    }

    async function handleLogout() {
        console.log('inside handle logout')
        const response = await fetch('/api/logout', {
            method: "POST",
        })
        const data = await response.json();
        console.log('data', data);

        if(response.ok){
            toast.success('Logout successfully')
            router.push('/login')
        } 
    }

    return (


        <form onSubmit={handleRegister} className="max-w-md mx-auto p-6 bg-base-100 rounded-xl shadow-lg space-y-4">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <div className='text-3xl cursor-pointer' onClick={() => (
                    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
                )}>🗿</div>
                <div className='flex flex-col gap-3'>
                    {isModalOpen ? (<div>{user.name} {user.email}  <div onClick={() => handleLogout()} className='cursor-pointer'>LOGOUT</div></div>) : <div></div>}
                </div>
            </div>

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