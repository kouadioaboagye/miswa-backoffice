"use client"

import React, { useState } from 'react';
import NewsCard from './news-card';

export interface NewsArticle {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

interface NewsSliderProps {
  articles: NewsArticle[];
  itemsPerView?: number;
}

const NewsSlider: React.FC<NewsSliderProps> = ({ 
  articles, 
  itemsPerView = 3 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(articles.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Navigation Controls - Left and Right */}
      {/* <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
        <button
          onClick={prevSlide}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1EA64A] text-white hover:bg-[#1a8a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto shadow-lg"
          disabled={totalSlides <= 1}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1EA64A] text-white hover:bg-[#1a8a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto shadow-lg"
          disabled={totalSlides <= 1}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div> */}

      {/* Slider Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${totalSlides * 100}%`
          }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div 
              key={slideIndex}
              className="w-full flex-shrink-0"
              style={{ width: `${100 / totalSlides}%` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles
                  .slice(slideIndex * itemsPerView, (slideIndex + 1) * itemsPerView)
                  .map((article, index) => (
                    <NewsCard
                      key={slideIndex * itemsPerView + index}
                      title={article.title}
                      excerpt={article.excerpt}
                      date={article.date}
                      category={article.category}
                      image={article.image}
                      author={article.author}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-[#1EA64A]' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsSlider;
