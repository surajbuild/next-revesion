import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="flex justify-center gap-4 p-4 bg-gray-900">
            <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
            >
                Home
            </Link>

            <Link
                href="/about"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
            >
                About
            </Link>

            <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
            >
                Contact
            </Link>
        </nav>
    )
}

export default Navbar
