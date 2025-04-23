//import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import images from your local assets
import image1 from "../src/assets/images/image1.jpg";
import image2 from "../src/assets/images/image2.jpg";
import image3 from "../src/assets/images/image3.jpg";
import image4 from "../src/assets/images/image4.jpg";
import image5 from "../src/assets/images/image5.jpg";
import image6 from "../src/assets/images/image6.jpg";
import image7 from "../src/assets/images/image7.jpg";

const Hero = () => {
    const images = [image1, image2, image3, image4, image5, image6, image7];

    return (
        <div>
            <section id="home" className="text-center py-8 sm:py-12 md:py-16">
                {/* Container for text content */}
                <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
                    {/* Tagline */}
                    <span className="inline-block px-4 py-1 bg-[#E6FFFC] text-[#00B5A5] rounded-full text-sm font-medium mb-4 mt-8 sm:mt-12">
                        Secure • Transparent • Reliable
                    </span>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#455883] to-[#00B5A5]">
                        Your Vote Matters
                    </h1>

                    {/* Description */}
                    <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-in">
                        Experience the future of democratic participation with our secure and transparent online voting system.
                    </p>
                </div>

                {/* Swiper for Image Slides */}
                <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[300px] rounded-xl overflow-hidden shadow-xl mx-4 sm:mx-6 lg:mx-8">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="w-full h-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default Hero;