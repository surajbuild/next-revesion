"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowRight, Check, LockKeyhole, Sparkles, UserRound } from 'lucide-react';


type UserProfile = {
    name: string;
    email: string;
};

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    const router = useRouter();
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
        const data: { error?: string; user?: UserProfile } = await response.json();
        console.log('data', data)
        if(!response.ok) {
            return router.push('/login')
        }
        if(!data.error && data.user) {
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
        <main className="home-shell">
            <section className="home-intro">
                <div className="eyebrow"><Sparkles size={15} /> A calmer way to get things done</div>
                <h1>Make room for the work that <em>matters.</em></h1>
                <p className="home-lede">A focused space for your everyday tasks, ideas, and next small wins. Start simple, stay in rhythm.</p>
                <ul className="benefit-list">
                    <li><span><Check size={15} /></span> Capture tasks in seconds</li>
                    <li><span><Check size={15} /></span> Keep your day beautifully clear</li>
                    <li><span><Check size={15} /></span> Pick up exactly where you left off</li>
                </ul>
                <div className="quiet-note"><LockKeyhole size={16} /> Your personal space stays yours.</div>
            </section>

            <section className="signup-panel" aria-labelledby="signup-title">
                <div className="profile-menu">
                    <button type="button" className="profile-button" aria-label="Open profile menu" onClick={() => setIsModalOpen(!isModalOpen)}>
                        <UserRound size={18} />
                    </button>
                    {isModalOpen && user && (
                        <div className="profile-popover">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                            <button type="button" onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                </div>
                <div className="form-heading">
                    <p className="form-kicker">Get started</p>
                    <h2 id="signup-title">Create your space</h2>
                    <p>Join in less than a minute. No noise, just momentum.</p>
                </div>
                <form onSubmit={handleRegister} className="signup-form">
                    <label htmlFor="name">Your name</label>
                    <input id="name" type="text" placeholder="e.g. Alex Morgan" required value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="password">Create a password</label>
                    <input id="password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="signup-button">Create account <ArrowRight size={18} /></button>
                </form>
                <p className="login-prompt">Already have an account? <Link href="/login">Log in <ArrowRight size={14} /></Link></p>
            </section>
        </main>
    )
}