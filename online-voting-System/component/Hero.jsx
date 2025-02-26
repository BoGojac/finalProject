// Hero.jsx
import React from 'react';
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
            <section id="home" className="text-center py-16 bg-white ">
                <div data-lov-id="src/pages/Index.jsx:34:8" data-lov-name="div" data-component-path="src/pages/Index.jsx" data-component-line="34" data-component-file="Index.jsx" data-component-name="div" data-component-content="%7B%22className%22%3A%22container%20mx-auto%20text-center%22%7D" class="container mx-auto text-center">
                    <span data-lov-id="src/pages/Index.jsx:35:10" data-lov-name="span" data-component-path="src/pages/Index.jsx" data-component-line="35" data-component-file="Index.jsx" data-component-name="span" data-component-content="%7B%22text%22%3A%22Secure%20%E2%80%A2%20Transparent%20%E2%80%A2%20Reliable%22%2C%22className%22%3A%22inline-block%20px-4%20py-1%20bg-%5B%23E6FFFC%5D%20text-%5B%2300B5A5%5D%20rounded-full%20text-sm%20font-medium%20mb-4%22%7D" class="inline-block px-4 py-1 bg-[#E6FFFC] text-[#00B5A5] rounded-full text-sm font-medium mb-4 mt-12">Secure • Transparent • Reliable</span>
                    <h1 data-lov-id="src/pages/Index.jsx:38:10" data-lov-name="h1" data-component-path="src/pages/Index.jsx" data-component-line="38" data-component-file="Index.jsx" data-component-name="h1" data-component-content="%7B%22text%22%3A%22Your%20Vote%20Matters%22%2C%22className%22%3A%22text-4xl%20md%3Atext-5xl%20lg%3Atext-6xl%20font-bold%20mb-6%20bg-clip-text%20text-transparent%20bg-gradient-to-r%20from-%5B%23455883%5D%20to-%5B%2300B5A5%5D%22%7D" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#455883] to-[#00B5A5]">Your Vote Matters</h1>
                    <p data-lov-id="src/pages/Index.jsx:41:10" data-lov-name="p" data-component-path="src/pages/Index.jsx" data-component-line="41" data-component-file="Index.jsx" data-component-name="p" data-component-content="%7B%22text%22%3A%22Experience%20the%20future%20of%20democratic%20participation%20with%20our%20secure%20and%20transparent%20online%20voting%20system.%22%2C%22className%22%3A%22text-gray-600%20text-lg%20md%3Atext-xl%20max-w-2xl%20mx-auto%20mb-8%20animate-fade-in%22%7D" class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in">Experience the future of democratic participation with our secure and transparent online voting system.</p>
                </div>
                    {/* to insert slide-image */}
                    <div className="h-[200px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
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
}

export default Hero;