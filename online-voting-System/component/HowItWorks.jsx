//HowItWorks.jsx
// import React from 'react';

// const HowItWorks = () => {
//     return (
//         <div>
//             <section id="how-it-works" className="py-12  h-screen">
//                 <h3 className="text-2xl font-bold text-center mt-10">How It Works</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-8">
//                      {/* to create card for easy Secure Voting */}
//                 <div data-lov-id="src/pages/Index.jsx:92:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="92" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-shadow%20duration-300%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-12 h-12 text-[#6B4AA0] mb-4" data-lov-id="src/pages/Index.jsx:93:16" data-lov-name="feature.icon" data-component-path="src/pages/Index.jsx" data-component-line="93" data-component-file="Index.jsx" data-component-name="feature.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%22%7D"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg><h3 data-lov-id="src/pages/Index.jsx:94:16" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="94" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Secure Voting</h3><p data-lov-id="src/pages/Index.jsx:95:16" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="95" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">State-of-the-art encryption ensures your vote remains confidential and tamper-proof.</p></div>

//                         {/* to create card for easy process */}
//                     <div data-lov-id="src/pages/Index.jsx:92:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="92" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-shadow%20duration-300%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-vote w-12 h-12 text-[#6B4AA0] mb-4" data-lov-id="src/pages/Index.jsx:93:16" data-lov-name="feature.icon" data-component-path="src/pages/Index.jsx" data-component-line="93" data-component-file="Index.jsx" data-component-name="feature.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%22%7D"><path d="m9 12 2 2 4-4"></path><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path><path d="M22 19H2"></path></svg><h3 data-lov-id="src/pages/Index.jsx:94:16" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="94" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Easy Process</h3><p data-lov-id="src/pages/Index.jsx:95:16" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="95" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">Simple voting process that anyone can complete in minutes.</p></div>

//                     {/* to create card for verify identity */}

//                     <div data-lov-id="src/pages/Index.jsx:92:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="92" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-shadow%20duration-300%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-12 h-12 text-[#6B4AA0] mb-4" data-lov-id="src/pages/Index.jsx:93:16" data-lov-name="feature.icon" data-component-path="src/pages/Index.jsx" data-component-line="93" data-component-file="Index.jsx" data-component-name="feature.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%22%7D"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><h3 data-lov-id="src/pages/Index.jsx:94:16" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="94" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Verify Identity</h3><p data-lov-id="src/pages/Index.jsx:95:16" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="95" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600"> Authentication protects against unauthorized access.</p></div>


//                         {/* to create card for liveresulte */}

//                         <div data-lov-id="src/pages/Index.jsx:92:14" data-lov-name="Card" data-component-path="src/pages/Index.jsx" data-component-line="92" data-component-file="Index.jsx" data-component-name="Card" data-component-content="%7B%22className%22%3A%22p-6%20hover%3Ashadow-lg%20transition-shadow%20duration-300%20border-%5B%23E5DEFF%5D%20border-2%22%7D" class="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-bar w-12 h-12 text-[#6B4AA0] mb-4" data-lov-id="src/pages/Index.jsx:93:16" data-lov-name="feature.icon" data-component-path="src/pages/Index.jsx" data-component-line="93" data-component-file="Index.jsx" data-component-name="feature.icon" data-component-content="%7B%22className%22%3A%22w-12%20h-12%20text-%5B%236B4AA0%5D%20mb-4%22%7D"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M7 16h8"></path><path d="M7 11h12"></path><path d="M7 6h3"></path></svg><h3 data-lov-id="src/pages/Index.jsx:94:16" data-lov-name="h3" data-component-path="src/pages/Index.jsx" data-component-line="94" data-component-file="Index.jsx" data-component-name="h3" data-component-content="%7B%22className%22%3A%22text-xl%20font-semibold%20mb-2%22%7D" class="text-xl font-semibold mb-2">Results</h3><p data-lov-id="src/pages/Index.jsx:95:16" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="95" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22className%22%3A%22text-gray-600%22%7D" class="text-gray-600">Watch results as they come in, with complete transparency.</p></div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default HowItWorks;







import React from 'react';

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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Voting</h3>
                        <p className="text-sm sm:text-base text-gray-600">State-of-the-art encryption ensures your vote remains confidential and tamper-proof.</p>
                    </div>

                    {/* Easy Process Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-vote w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4">
                            <path d="m9 12 2 2 4-4"></path>
                            <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path>
                            <path d="M22 19H2"></path>
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Easy Process</h3>
                        <p className="text-sm sm:text-base text-gray-600">Simple voting process that anyone can complete in minutes.</p>
                    </div>

                    {/* Verify Identity Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Verify Identity</h3>
                        <p className="text-sm sm:text-base text-gray-600">Authentication protects against unauthorized access.</p>
                    </div>

                    {/* Results Card */}
                    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-bar w-8 h-8 sm:w-12 sm:h-12 text-[#6B4AA0] mb-4">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                            <path d="M7 16h8"></path>
                            <path d="M7 11h12"></path>
                            <path d="M7 6h3"></path>
                        </svg>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Results</h3>
                        <p className="text-sm sm:text-base text-gray-600">Watch results as they come in, with complete transparency.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;