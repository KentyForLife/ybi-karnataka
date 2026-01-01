/**
 * Home / Landing Page
 * Displays hero section with background image, stats, about section, features, and CTAs
 * Entry point for visitors to understand and explore VBI
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home(){
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <motion.div 
        className="relative text-center overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url("/ybi-hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '600px'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/40 to-brand-900/30 z-5" />

        {/* Content overlay */}
        <motion.div 
          className="relative z-10 px-6 text-white text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Large YBI Logo Text */}
          <motion.div className="mb-6" variants={itemVariants}>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-2" style={{textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
              YBI
            </h1>
            <motion.h2 
              className="text-2xl md:text-3xl font-light tracking-widest text-white/95"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              YOUTH BIOLOGY INSTITUTE
            </motion.h2>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-12 font-light leading-relaxed"
            variants={itemVariants}
          >
            A student-led research repository advancing biology innovation. Explore, contribute, and drive the future of research.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button as={Link} to="/browse" variant="primary" size="lg" className="text-lg px-12 py-4 shadow-lg hover:shadow-brand-lg transition-all">
                Explore Research
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section - Modern Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 bg-gradient-to-b from-gray-50 to-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center p-8 rounded-xl bg-white border-2 border-brand-100 hover:border-brand-600 hover:shadow-lg transition-all"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent mb-2">100+</div>
          <p className="text-gray-600 text-lg font-semibold">Research Papers</p>
          <p className="text-gray-500 text-sm mt-1">Curated and verified</p>
        </motion.div>
        <motion.div 
          className="text-center p-8 rounded-xl bg-white border-2 border-green-100 hover:border-green-600 hover:shadow-lg transition-all"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">50+</div>
          <p className="text-gray-600 text-lg font-semibold">Workshops</p>
          <p className="text-gray-500 text-sm mt-1">Community-led education</p>
        </motion.div>
        <motion.div 
          className="text-center p-8 rounded-xl bg-white border-2 border-blue-100 hover:border-blue-600 hover:shadow-lg transition-all"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">500+</div>
          <p className="text-gray-600 text-lg font-semibold">Contributors</p>
          <p className="text-gray-500 text-sm mt-1">From around the world</p>
        </motion.div>
      </motion.div>
      
      {/* About Section */}
      <motion.div 
        className="bg-gradient-to-r from-brand-50 via-brand-50 to-brand-100 rounded-2xl p-12 md:p-16 mx-6 my-12 border-2 border-brand-200"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl font-bold text-gray-900 mb-6" variants={itemVariants}>What is YBI?</motion.h2>
          <motion.p className="text-lg text-gray-700 leading-relaxed mb-8" variants={itemVariants}>
            The Youth Biology Institute is a student-led initiative where students passionate about biology share research, ideas, and innovations. We also work with public schools around Karnataka to organise workshops to instil a passion for Biology in them. We work with numerous zealous students on collaborative research projects to help drive our love for Biology.
          </motion.p>
          <motion.div className="flex flex-col md:flex-row gap-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button as={Link} to="/browse" variant="primary" size="md">Browse Papers</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button as={Link} to="/about" variant="outline" size="md">Learn More</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="p-8 border-2 border-brand-200 rounded-xl bg-white hover:border-brand-600 hover:shadow-lg transition-all group cursor-pointer"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="text-4xl mb-4 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: 10 }}
          >
            📚
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Curated Research</h3>
          <p className="text-gray-600">Access a carefully organized collection of biology research from students and researchers worldwide.</p>
        </motion.div>
        <motion.div 
          className="p-8 border-2 border-green-200 rounded-xl bg-white hover:border-green-600 hover:shadow-lg transition-all group cursor-pointer"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="text-4xl mb-4 group-hover:scale-110 transition-transform"
            whileHover={{ rotate: 10 }}
          >
            ✍️
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Contribute</h3>
          <p className="text-gray-600">Share your research and become part of a vibrant community driving innovation in biology education.</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
          <p className="text-gray-600">Share your research and insights with our growing community. Get visibility and feedback from peers.</p>
        </div>
        <div className="p-8 border-2 border-brand-200 rounded-xl hover:border-brand-600 hover:shadow-brand transition-all animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Network</h3>
          <p className="text-gray-600">Connect with students and researchers who share your passion for biology innovation.</p>
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
          Join numerous students exploring the frontiers of biomechanics research.
        </p>
        <Button as={Link} to="/browse" variant="secondary" size="lg" className="shadow-lg">
          Start Exploring Now
        </Button>
      </div>
    </div>
  )
}
