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
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 'places',
    name: 'Places',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f33ef05cac0a959ca7e5e6_places-icon.svg',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 'heart',
    name: 'Favorites',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f34342e3e5062aabcadb04_heart-icon.svg',
    photos: [
      'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=800&fit=crop',
    ],
  },
  {
    id: 'dog',
    name: 'Dog',
    icon: 'https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/62f33ef00ae83f7d38631375_dog-icon.svg',
    photos: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&h=800&fit=crop',
    ],
  },
];

export function PhotoCarousel() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentCategory = photoCategories.find(cat => cat.id === activeCategory) || photoCategories[0];
  const totalSlides = currentCategory.photos.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, activeCategory]);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div id="w-node-_6c8a77c8-e695-9470-df4c-56e39795c7d7-d4229b69" className="tile sm photos about">
      {/* Photos Icon Link */}
      <a 
        href="https://www.icloud.com/sharedalbum/#B0sG4TcsmPMIYn" 
        target="_blank"
        rel="noopener noreferrer"
        className="small-app-icon-div photos"
      >
        <img 
          src="https://cdn.prod.website-files.com/62c89bdb7c26b515f632de67/630d832176e726efcbad3972_Photos-min.webp" 
          loading="lazy" 
          alt="Photos" 
          className="small-tile-icon"
        />
      </a>

      {/* Category Navigation */}
      <div className="photos-menu">
        <div className="photos-floating-indicator" style={{
          transform: `translateX(${photoCategories.findIndex(cat => cat.id === activeCategory) * 69}px)`,
        }} />
        
        {photoCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
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
