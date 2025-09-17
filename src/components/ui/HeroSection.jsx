import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../../assets/images/hero1.svg";
import hero2 from "../../assets/images/hero2.svg";
import hero3 from "../../assets/images/hero3.svg";
const lifestyleImg = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=400&fit=crop";

const offers = [
  {
    title: "Back to School Sale",
    subtitle: "Up to 50% off on essentials!",
    image: hero1,
    gradient: "from-blue-500 via-purple-500 to-pink-500",
  },
  {
    title: "Festive Collection",
    subtitle: "Celebrate with exclusive deals!",
    image: hero2,
    gradient: "from-yellow-400 via-red-400 to-pink-500",
  },
  {
    title: "Summer Specials",
    subtitle: "Cool products for hot days!",
    image: hero3,
    gradient: "from-green-400 via-blue-400 to-purple-500",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const offer = offers[current];

  return (
    <section className={`relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-r ${offer.gradient}`}>
      <div className="absolute inset-0 z-0">
        <img src={lifestyleImg} alt="Lifestyle" className="w-full h-full object-cover opacity-30" loading="lazy" />
      </div>
      <div className="relative z-10 flex w-full max-w-6xl mx-auto items-center justify-between px-6">
        <div className="flex-1 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {offer.title}
              </h1>
              <p className="text-lg md:text-2xl text-white/80 font-medium">
                {offer.subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.08 }}
                className="mt-4 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition-all"
              >
                Shop Now
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex-1 flex justify-end">
          <motion.img
            key={offer.image}
            src={offer.image}
            alt={offer.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="w-[250px] md:w-[350px] rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {offers.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all ${current === idx ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to offer ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
