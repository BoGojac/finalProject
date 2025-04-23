//import React from 'react';

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300">
                                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                <path d="M10 6h4"></path>
                                <path d="M10 10h4"></path>
                                <path d="M10 14h4"></path>
                                <path d="M10 18h4"></path>
                            </svg>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Active Parties</h3>
                            <p className="text-sm sm:text-base text-gray-600">View all registered political parties participating in the current election.</p>
                        </div>
                    </div>

                    {/* Active Candidates Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
                        <div className="flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Active Candidates</h3>
                            <p className="text-sm sm:text-base text-gray-600">See the full list of candidates running in various constituencies.</p>
                        </div>
                    </div>

                    {/* Live Results Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
                        <div className="flex flex-col items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-pie w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300">
                                <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path>
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                            </svg>
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