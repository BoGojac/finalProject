import React from 'react';

const About = () => {
    return (
        <div>
            <section id='about' className="py-12  h-screen">
                <h3 className="text-2xl font-bold text-center mt-10">About NEBE</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-8">
                    {/* Our Mission Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flag w-12 h-12 text-[#6B4AA0] mb-4">
                            <path d="M4 22V4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p className="text-gray-600">Condact impartial, free and inclusive election in accordance with the law and internation election principle; regulate political parties and candidates; ensure that citizens elect their representatives freely and with sufficent understanding; and conduct activities that ensure public representation is determined “only through election”.</p>
                    </div>
                    
                    {/* Our Vision Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye w-12 h-12 text-[#6B4AA0] mb-4">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-gray-600">To be a model and trusted democratic institution in copliance with internation election management standars.</p>
                    </div>
                    
                    {/* Our Team Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-12 h-12 text-[#6B4AA0] mb-4">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                        <p className="text-gray-600">A group of dedicated professionals working together to bring secure and efficient voting solutions.</p>
                    </div>
                    
                    {/* Our Values Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-12 h-12 text-[#6B4AA0] mb-4">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                        <p className="text-gray-600">Integrity, transparency, and innovation drive everything we do to ensure a fair voting process.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
