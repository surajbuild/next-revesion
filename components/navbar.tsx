import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between gap-4 border-b border-[#dfe5dc] bg-[#f5f6ef] px-6 py-4 md:px-10">
            <Link href="/" className="font-serif text-xl font-semibold tracking-[-0.04em] text-[#17211f]">flow<span className="text-[#d86b45]">.</span></Link>
            <div className="flex gap-2">
            <Link
                href="/"
                className="rounded-full px-4 py-2 text-sm text-[#687572] transition hover:bg-white hover:text-[#17211f]"
            >
                Home
            </Link>

            <Link
                href="/about"
                className="rounded-full px-4 py-2 text-sm text-[#687572] transition hover:bg-white hover:text-[#17211f]"
            >
                About
            </Link>

            <Link
                href="/contact"
                className="rounded-full px-4 py-2 text-sm text-[#687572] transition hover:bg-white hover:text-[#17211f]"
            >
                Contact
            </Link>
            </div>
        </nav>
    )
}

export default Navbar
