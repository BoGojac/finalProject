import React from 'react';

const Header = () => {
    return (
        <div>
            <header className="flex py-4 px-6 border-b bg-gradient-to-r from-[#455883] to-[#00B5A5] fixed w-full items-center z-1000">
                <div className='flex items-center mr-15'>
                <img src="../src/assets/react.svg" alt="Logo" className="h-8 w-auto" />
                <h1 className="text-white text-lg font-bold  ml-4">Secure Vote</h1>
                </div>
                <div className='ml-30 mr-25'>
                <nav>
                    <ul className="flex text-white space-x-20">
                        <li>
                            <a href="#home" className="inline-flex transition-transform duration-300 transform hover:scale-105 hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="#how-it-works" className="inline-flex transition-transform duration-300 transform hover:scale-105 hover:underline">How it Works</a>
                        </li>
                        <li>
                            <a href="#quick-actions" className="inline-flex transition-transform duration-300 transform hover:scale-105 hover:underline">Quick Actions</a>
                        </li>
                        <li>
                            <a href="#about" className="inline-flex transition-transform duration-300 transform hover:scale-105 hover:underline">About</a>
                        </li>
                        <li>
                            <a href="#contact-us" className="inline-flex transition-transform duration-300 transform hover:scale-105 hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </nav>
                </div>
                <div className='ml-25'>
                <button className="bg-[#6B4AA0] hover:bg-[#5a3b91]  text-white px-4 py-2 rounded-md">Login</button>
                </div>
                
           </header>
        </div>
    );
}

export default Header;
