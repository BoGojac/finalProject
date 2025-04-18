// QuickActions.jsx
// import React from 'react';

// const QuickActions = () => {
//     return (
//         <div>
//             <section id='quick-actions' className="py-12 h-screen">
//                 <h3 className="text-2xl font-bold text-center mt-10">Quick Actions</h3>      
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mt-8">
//                      {/* to create card for active parties */}
//                     <div data-lov-id="src/pages/Index.jsx:126:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="126" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-all%20duration-300%20cursor-pointer%20transform%20hover%3A-translate-y-1%20group%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
//                         <div data-lov-id="src/pages/Index.jsx:131:16" data-lov-name="div" data-component-path="src/pages/Index.jsx" data-component-line="131" data-component-file="Index.jsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22flex%20flex-col%20items-center%20text-center%22%7D" class="flex flex-col items-center text-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2 w-12 h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300" data-lov-id="src/pages/Index.jsx:132:18" data-lov-name="action.icon" data-component-path="src/pages/Index.jsx" data-component-line="132" data-component-file="Index.jsx" data-component-name="action.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%20group-hover%3Ascale-110%20transition-transform%20duration-300%22%7D">
//                                 <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
//                                 <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
//                                 <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
//                                 <path d="M10 6h4"></path>
//                                 <path d="M10 10h4"></path>
//                                 <path d="M10 14h4"></path>
//                                 <path d="M10 18h4"></path>
//                             </svg>
//                             <h3 data-lov-id="src/pages/Index.jsx:133:18" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="133" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Active Parties</h3>
//                             <p data-lov-id="src/pages/Index.jsx:134:18" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="134" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">View all registered political parties participating in the current election.</p>
//                         </div>
//                     </div>

//                     {/* to create card for active candidates */}

//                     <div data-lov-id="src/pages/Index.jsx:126:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="126" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-all%20duration-300%20cursor-pointer%20transform%20hover%3A-translate-y-1%20group%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
//                         <div data-lov-id="src/pages/Index.jsx:131:16" data-lov-name="div" data-component-path="src/pages/Index.jsx" data-component-line="131" data-component-file="Index.jsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22flex%20flex-col%20items-center%20text-center%22%7D" class="flex flex-col items-center text-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-12 h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300" data-lov-id="src/pages/Index.jsx:132:18" data-lov-name="action.icon" data-component-path="src/pages/Index.jsx" data-component-line="132" data-component-file="Index.jsx" data-component-name="action.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%20group-hover%3Ascale-110%20transition-transform%20duration-300%22%7D">
//                                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                                     <circle cx="12" cy="7" r="4"></circle>
//                             </svg>
//                             <h3 data-lov-id="src/pages/Index.jsx:133:18" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="133" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Active Candidates</h3>
//                             <p data-lov-id="src/pages/Index.jsx:134:18" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="134" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">See the full list of candidates running in various constituencies.</p>
//                         </div>
//                     </div>

//                         {/* to create card for liveresult */}
                        
//                     <div data-lov-id="src/pages/Index.jsx:126:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="126" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-all%20duration-300%20cursor-pointer%20transform%20hover%3A-translate-y-1%20group%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border-[#E5DEFF] border-2">
//                         <div data-lov-id="src/pages/Index.jsx:131:16" data-lov-name="div" data-component-path="src/pages/Index.jsx" data-component-line="131" data-component-file="Index.jsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22flex%20flex-col%20items-center%20text-center%22%7D" class="flex flex-col items-center text-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-pie w-12 h-12 text-[#6B4AA0] mb-4 group-hover:scale-110 transition-transform duration-300" data-lov-id="src/pages/Index.jsx:132:18" data-lov-name="action.icon" data-component-path="src/pages/Index.jsx" data-component-line="132" data-component-file="Index.jsx" data-component-name="action.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%20group-hover%3Ascale-110%20transition-transform%20duration-300%22%7D">
//                                 <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path>
//                                 <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
//                             </svg>
//                             <h3 data-lov-id="src/pages/Index.jsx:133:18" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="133" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Live Results</h3>
//                             <p data-lov-id="src/pages/Index.jsx:134:18" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="134" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">Check real-time election results and statistics.</p>
//                         </div>
//                     </div>
//                 </div>    
//             </section>
//         </div>
//     );
// }

// export default QuickActions;








import React from 'react';

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