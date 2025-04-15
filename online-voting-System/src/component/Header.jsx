// import React from 'react';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed w-full bg-gradient-to-r from-[#455883] to-[#00B5A5] shadow-md z-[1000]">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo and Title */}
                <div className='flex items-center'>
                    <img src="../src/assets/NEBELOGO.svg" alt="Logo" className="h-8 w-10 rounded-full" />
                    <h1 className="text-white text-lg font-bold ml-4">NEBE Vote</h1>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {['Home', 'How it Works', 'Quick Actions', 'About', 'Contact Us'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                            className="text-white transition-transform duration-300 transform hover:scale-105 hover:underline hover:text-white/80"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
                
                {/* Login Button */}
                <Link
                    to="/login" // Navigate to the LoginPage
                    className="hidden md:block bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2 rounded-md"
                >
                    Login
                </Link>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="md:hidden bg-[#455883] p-4 text-center">
                    {['Home', 'How it Works', 'Quick Actions', 'About', 'Contact Us'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                            className="block text-white py-2 hover:underline"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    {/* Login Button for Mobile (Replaced with Link) */}
                    <Link
                        to="/login" // Navigate to the LoginPage
                        className="w-full mt-4 bg-[#6B4AA0] hover:bg-[#5a3b91] text-white px-4 py-2 rounded-md block"
                    >
                        Login
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;