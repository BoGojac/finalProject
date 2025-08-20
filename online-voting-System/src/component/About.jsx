// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import {Flag, Eye,Users, Heart} from 'lucide-react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const About = () => {
    // Array of card data for easier management
    const cards = [
        {
            title: "Our Mission",
            description: "Condact impartial, free and inclusive election in accordance with the law and internation election principle; regulate political parties and candidates; ensure that citizens elect their representatives freely and with sufficent understanding; and conduct activities that ensure public representation is determined \"only through election\".",
            icon: (
                <Flag className="lucide lucide-flag w-8 h-8 md:w-12 md:h-12 text-[#6B4AA0] mb-3 md:mb-4"/>
            )
        },
        {
            title: "Our Vision",
            description: "To be a model and trusted democratic institution in copliance with internation election management standars.",
            icon: (
                <Eye className="lucide lucide-eye w-8 h-8 md:w-12 md:h-12 text-[#6B4AA0] mb-3 md:mb-4"/>
            )
        },
        {
            title: "Our Team",
            description: "A group of dedicated professionals working together to bring secure and efficient voting solutions.",
            icon: (
                <Users className="lucide lucide-users w-8 h-8 md:w-12 md:h-12 text-[#6B4AA0] mb-3 md:mb-4"/>
            )
        },
        {
            title: "Our Values",
            description: "Integrity, transparency, and innovation drive everything we do to ensure a fair voting process.",
            icon: (
                <Heart className="lucide lucide-heart w-8 h-8 md:w-12 md:h-12 text-[#6B4AA0] mb-3 md:mb-4"/>
            )
        }
    ];

    return (
        <div>
            <section id='about' className="py-6 md:py-12">
                <h3 className="text-xl md:text-2xl font-bold text-center mt-4 md:mt-10">About NEBE</h3>
                
                {/* Mobile view: Swiper carousel (visible only on small screens) */}
                <div className="md:hidden px-4 mt-4">
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={15}
                        slidesPerView={1}
                        loop={cards.length > 1}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="about-swiper"
                    >
                        {cards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 md:p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2 h-full">
                                    {card.icon}
                                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">{card.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600">{card.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                
                {/* Desktop view: Grid layout (hidden on small screens) */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mt-8">
                    {cards.map((card, index) => (
                        <div key={index} className="rounded-lg bg-card text-card-foreground shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border-[#E5DEFF] border-2">
                            {card.icon}
                            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;