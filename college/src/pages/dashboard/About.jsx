import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Grid, LayoutGrid } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import image1 from '@/assets/coursenotes_page-0001.jpg'
import image2 from '@/assets/coursenotes_page-0002.jpg'
import image3 from '@/assets/coursenotes_page-0003.jpg'
import image4 from '@/assets/coursenotes_page-0004.jpg'
export default function UniversityGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const galleryItems = [
    {
      id: 1,
      category: 'Campus',
      title: 'Modern Campus Infrastructure',
      image: image1,
      description: 'State-of-the-art facilities and modern architecture'
    },
    {
      id: 2,
      category: 'Labs',
      title: 'Advanced Medical Laboratory',
      image: image2,
      description: 'Fully equipped with latest technology'
    },
    {
      id: 3,
      category: 'Classroom',
      title: 'Interactive Learning Spaces',
      image: image3,
      description: 'Modern classrooms for effective education'
    },
    {
      id: 4,
      category: 'Events',
      title: 'Student Engagement Activities',
      image: image4,
      description: 'Regular seminars and workshops'
    },
    // {
    //   id: 5,
    //   category: 'Library',
    //   title: 'Comprehensive Learning Resource Center',
    //   image: 'https://images.unsplash.com/photo-1507842721343-583eccdc6a1b?w=500&h=500&fit=crop',
    //   description: 'Vast collection of medical and scientific resources'
    // },
    // {
    //   id: 6,
    //   category: 'Sports',
    //   title: 'Sports & Wellness Facilities',
    //   image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop',
    //   description: 'Well-maintained athletic facilities'
    // },
    // {
    //   id: 7,
    //   category: 'Hostel',
    //   title: 'Comfortable Hostel Accommodations',
    //   image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop',
    //   description: 'Safe and convenient living spaces'
    // },
    // {
    //   id: 8,
    //   category: 'Events',
    //   title: 'Annual University Fest',
    //   image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop',
    //   description: 'Celebrations of culture and talent'
    // },
  ];

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const currentImageIndex = selectedImage
    ? filteredItems.findIndex(item => item.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setSelectedImage(filteredItems[currentImageIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentImageIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold mb-4">
            📸 CAMPUS GALLERY
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}World Class Facilities
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover the excellence and innovation that defines our institution
          </p>
        </div>

        {/* Category Filter & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded transition-all duration-300 ${
                viewMode === 'masonry'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max'
          }`}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                cursor-pointer group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105
                ${viewMode === 'masonry' && index % 3 === 1 ? 'md:row-span-2' : ''}
              `}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge className="bg-blue-600 text-white w-fit mb-2">
                  {item.category}
                </Badge>
                <h3 className="text-lg font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-200">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Count */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {galleryItems.length} images
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-4xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
              title="Close (ESC)"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Navigation Arrows */}
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {currentImageIndex < filteredItems.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                {currentImageIndex + 1} / {filteredItems.length}
              </div>
            </div>

            {/* Image Details */}
            <div className="mt-6 text-white text-center">
              <Badge className="bg-blue-600 mb-3">
                {selectedImage.category}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-300">
                {selectedImage.description}
              </p>
              <div className="mt-4 text-sm text-gray-400">
                <p>Press <kbd className="bg-gray-700 px-2 py-1 rounded">ESC</kbd> to close • <kbd className="bg-gray-700 px-2 py-1 rounded">← →</kbd> to navigate</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}