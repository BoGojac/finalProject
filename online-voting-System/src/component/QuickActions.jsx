// import React from 'react';
import {User, Building2, ChartPie } from 'lucide-react'
const QuickActions = () => {
    return (
        <div>
            <section id='quick-actions' className="py-8 sm:py-12 md:py-16 h-auto sm:h-screen">
                {/* Responsive Heading */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-6 sm:mt-10">
                    Quick Actions
                </h3>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 mt-6 sm:mt-8">
                    {/* Active Parties Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
                        <div className="flex flex-col items-center text-center">
                            <Building2 className="lucide lucide-building2 w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300"/>                            
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Active Parties</h3>
                            <p className="text-sm sm:text-base text-gray-600">View all registered political parties participating in the current election.</p>
                        </div>
                    </div>

                    {/* Active Candidates Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
                        <div className="flex flex-col items-center text-center">
                        <User className="lucide lucide-user w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300"/>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Active Candidates</h3>
                            <p className="text-sm sm:text-base text-gray-600">See the full list of candidates running in various constituencies.</p>
                        </div>
                    </div>

                    {/* Live Results Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
                        <div className="flex flex-col items-center text-center">
                            <ChartPie className="lucide lucide-chart-pie w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300"/>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Live Results</h3>
                            <p className="text-sm sm:text-base text-gray-600">Check real-time election results and statistics.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuickActions;