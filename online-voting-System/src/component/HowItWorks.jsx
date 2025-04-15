// import React from 'react';
import {ShieldCheck,LaptopMinimalCheck,Users, ChartBar } from 'lucide-react'
const HowItWorks = () => {
    return (
        <div>
            <section id="how-it-works" className="py-8 sm:py-12 md:py-16 h-auto sm:h-screen">
                {/* Responsive Heading */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-6 sm:mt-10">
                    How It Works
                </h3>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 mt-6 sm:mt-8">
                    {/* Secure Voting Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                    <ShieldCheck className="lucide lucide-shield w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4"/>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Voting</h3>
                        <p className="text-sm sm:text-base text-gray-600">State-of-the-art encryption ensures your vote remains confidential and tamper-proof.</p>
                    </div>

                    {/* Easy Process Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                    <LaptopMinimalCheck  className="lucide lucide-vote w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4"/>
                        
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Process</h3>
                        <p className="text-sm sm:text-base text-gray-600">Simple voting process that anyone can complete in minutes.</p>
                    </div>

                    {/* Verify Identity Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                    <Users className="lucide lucide-users w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4"/>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Verify Identity</h3>
                        <p className="text-sm sm:text-base text-gray-600">Authentication protects against unauthorized access.</p>
                    </div>

                    {/* Results Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <ChartBar className="lucide lucide-chart-bar w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4"/>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Results</h3>
                        <p className="text-sm sm:text-base text-gray-600">Watch results as they come in, with complete transparency.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;