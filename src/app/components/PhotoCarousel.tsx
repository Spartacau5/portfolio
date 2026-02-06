'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PhotoCategory {
  id: string;
  name: string;
  icon: string;
  photos: string[];
}

const photoCategories: PhotoCategory[] = [
  {
    id: 'all',
    name: 'All',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f3408bff92d3dec1bc25b0_everything-icon.svg',
    photos: [
      '/images/photos/DSCF6266.JPG',
      '/images/photos/1745887158804.jpg',
      '/images/photos/1752265266549.jpg',
      '/images/photos/DSCF6249.JPG',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f33ef05cac0a959ca7e5e6_places-icon.svg',
    photos: [
      '/images/photos/DSC_5967.jpeg',
      '/images/photos/Gemini_Generated_Image_6lja576lja576lja.png',
      '/images/photos/Gemini_Generated_Image_kjoouskjoouskjoo.png',
      '/images/photos/IMG_0217.jpeg',
      '/images/photos/IMG_1289.jpg',
      '/images/photos/IMG_1355.jpeg',
      '/images/photos/IMG_6399.jpeg',
    ],
  },
  {
    id: 'heart',
    name: 'Favorites',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f34342e3e5062aabcadb04_heart-icon.svg',
    photos: [
      '/images/photos/IMG_8940.png',
      '/images/photos/FF7C167F-DCEA-47C2-8EE1-1DB2C3D1B629.jpeg',
    ],
  },
  {
    id: 'dog',
    name: 'Dog',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f33ef00ae83f7d38631375_dog-icon.svg',
    photos: [
      '/images/photos/IMG_1342.jpeg',
      '/images/photos/billu2.jpeg',
      '/images/photos/597327246_1309438800869894_2014569186096821257_n.png',
    ],
  },
];

export function PhotoCarousel() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentCategoryIndex = photoCategories.findIndex(cat => cat.id === activeCategory);
  const currentCategory = photoCategories[currentCategoryIndex] || photoCategories[0];
  const totalSlides = currentCategory.photos.length;

  // Auto-play functionality - cycles through photos and sections
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // If we've reached the end of current section, move to next section
        if (nextSlide >= totalSlides) {
          const nextCategoryIndex = (currentCategoryIndex + 1) % photoCategories.length;
          setActiveCategory(photoCategories[nextCategoryIndex].id);
          return 0; // Reset to first slide of new section
        }
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, currentCategoryIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  const handleCategoryClick = (categoryId: string) => {
    setIsAutoPlaying(false);
    setActiveCategory(categoryId);
    setCurrentSlide(0);
    setTimeout(() => setIsAutoPlaying(true), 7000);
  };

  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c7d7-d4229b69" className="tile sm photos about">
      {/* Photos Icon */}
      <div className="small-app-icon-div photos">
        <img
          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/630d832176e726efcbad3972_Photos-min.webp"
          loading="lazy"
          alt="Photos"
          className="small-tile-icon"
        />
      </div>

      {/* Category Navigation */}
      <div className="photos-menu">
        <div className="photos-floating-indicator" style={{
          transform: `translateX(${photoCategories.findIndex(cat => cat.id === activeCategory) * 69}px)`,
        }} />
        
        {photoCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="photos-nav-item"
          >
            <img 
              src={category.icon} 
              loading="lazy" 
              alt={category.name}
              style={{ opacity: activeCategory === category.id ? 1 : 0.5 }}
              className="photo-icon"
            />
          </button>
        ))}
      </div>

      {/* Photo Slider */}
      <div className="photos-slider">
        <div className="photos-slider-mask">
          {currentCategory.photos.map((photo, index) => (
            <div
              key={index}
              className="photo-slide"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                visibility: index === currentSlide ? 'visible' : 'hidden',
                backgroundImage: `url(${photo})`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
