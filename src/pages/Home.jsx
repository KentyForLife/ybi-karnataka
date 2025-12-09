/**
 * Home / Landing Page
 * Displays hero section with background image, stats, about section, features, and CTAs
 * Entry point for visitors to understand and explore VBI
 */

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function Home(){
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div 
        className="relative text-center overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url("/ybi-hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px'
        }}
      >
        {/* Blurred background overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/ybi-hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            opacity: 0.4
          }}
        />
        
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/30 to-black/40 z-5" />

        {/* Content overlay */}
        <div className="relative z-10 px-6 text-white text-center max-w-3xl">
          {/* Large YBI Logo Text */}
          <div className="mb-6 animate-fadeInUp">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-2" style={{textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
              YBI
            </h1>
            <h2 className="text-2xl md:text-3xl font-light tracking-widest text-white/95">
              YOUTH BIOMECHANICS INSTITUTE
            </h2>
          </div>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/90 mb-12 font-light leading-relaxed animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            A student-led research repository advancing biomechanics innovation. Explore, contribute, and drive the future of research.
          </p>
          
          {/* CTA Button */}
          <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <Button as={Link} to="/browse" variant="primary" size="lg" className="text-lg px-12 py-4 shadow-lg hover:shadow-brand-lg hover:scale-105 transition-all">
              Explore Research
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
        <div className="text-center animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <div className="text-5xl font-bold text-brand-600 mb-2">500+</div>
          <p className="text-gray-600 text-lg">Research Papers</p>
        </div>
        <div className="text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <div className="text-5xl font-bold text-brand-600 mb-2">100+</div>
          <p className="text-gray-600 text-lg">Student Contributors</p>
        </div>
        <div className="text-center animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <div className="text-5xl font-bold text-brand-600 mb-2">50+</div>
          <p className="text-gray-600 text-lg">Institutions Represented</p>
        </div>
      </div>
      
      {/* About Section */}
      <div className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-12 md:p-16 mx-6 animate-fadeInUp">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">What is YBI?</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">
          The Youth Biomechanics Institute is a collaborative platform where students passionate about biomechanics share research, ideas, and innovations. We believe in democratizing access to quality research and fostering a community of young researchers.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button as={Link} to="/browse" variant="primary" size="md">Browse Papers</Button>
          <Button as={Link} to="/about" variant="outline" size="md">Learn More</Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">
        <div className="p-8 border-2 border-brand-200 rounded-xl hover:border-brand-600 hover:shadow-brand transition-all animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Research</h3>
          <p className="text-gray-600">Access a carefully organized collection of biomechanics research from students and researchers worldwide.</p>
        </div>
        <div className="p-8 border-2 border-brand-200 rounded-xl hover:border-brand-600 hover:shadow-brand transition-all animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contribute</h3>
          <p className="text-gray-600">Share your research and insights with our growing community. Get visibility and feedback from peers.</p>
        </div>
        <div className="p-8 border-2 border-brand-200 rounded-xl hover:border-brand-600 hover:shadow-brand transition-all animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Network</h3>
          <p className="text-gray-600">Connect with students and researchers who share your passion for biomechanics innovation.</p>
        </div>
        <div className="p-8 border-2 border-brand-200 rounded-xl hover:border-brand-600 hover:shadow-brand transition-all animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn</h3>
          <p className="text-gray-600">Explore diverse perspectives and cutting-edge research to advance your own understanding.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl p-12 md:p-16 mx-6 text-center animate-fadeInUp">
        <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
        <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of students exploring the frontiers of biomechanics research.
        </p>
        <Button as={Link} to="/browse" variant="secondary" size="lg" className="shadow-lg">
          Start Exploring Now
        </Button>
      </div>
    </div>
  )
}
