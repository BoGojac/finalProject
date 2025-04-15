// import React from 'react';
import { FaTelegramPlane, FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer id='contact-us' className="py-8 px-4 sm:px-6 border-t bg-gradient-to-r from-[#455883]/60 to-[#00B5A5]/85 backdrop-blur-sm sm:mt-10">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-6 md:space-y-0">
                        
                        {/* Logo and Name */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <img src="../src/assets/NEBE LOGO-01.svg" alt="Logo" className="h-10 w-auto" />
                            <span className="font-semibold text-white text-lg">NEBE Vote</span>
                        </div>

                        {/* Follow Us Section */}
                        <div className="flex flex-col items-center md:items-start space-y-3">
                            <p className="text-white text-lg font-semibold">Follow Us</p>
                            {/* Social Media Icons */}
                            <div className="flex justify-center md:justify-start space-x-5">
                                <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                                    <FaTelegramPlane size={24} />
                                </a>
                                <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                                    <FaFacebookF size={24} />
                                </a>
                                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                                    <FaWhatsapp size={24} />
                                </a>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <p className="text-white text-lg font-semibold">Contact Us</p>
                            
                            {/* Email */}
                            <p className="text-white text-sm flex items-center space-x-2">
                                <FaEnvelope /> <span>+123 456 7890</span>
                            </p>
                            
                            {/* Phone */}
                            <p className="text-white text-sm flex items-center space-x-2">
                                <FaPhone /> <span>+123 456 7890</span>
                            </p>
                        </div>

                        {/* Privacy Policy & Terms of Service */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6">
                            <a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-white/80 hover:text-white transition-colors">Terms of Service</a>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;