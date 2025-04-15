// import React from 'react';
import About from '../component/About.jsx';
import Footer from '../component/Footer';
import Header from '../component/Header.jsx';
import Hero from '../component/Hero';
import HowItWorks from '../component/HowItWorks';
import QuickActions from '../component/QuickActions';

const HomePage = () => {
	return (
		<div>
			<Header />
			<Hero />
			<HowItWorks />
			<QuickActions />
			<About />
			<Footer />
		</div>
	);
};

export default HomePage;
