import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Search, Filter, Zap } from 'lucide-react';

const EmptyStateDoctors = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-32 max-w-2xl mx-auto"
    >
      {/* Illustration */}
      <div className="relative mx-auto mb-8">
        <div className="w-48 h-48 bg-neutral-900 rounded-3xl mx-auto shadow-2xl flex items-center justify-center relative overflow-hidden">
          <Icon 
            icon="mdi:doctor" 
            className="w-32 h-32 text-neutral-600 opacity-20 absolute" 
          />
          <div className="relative z-10">
            <Search className="w-24 h-24 text-neutral-600 mx-auto mb-4 opacity-50" />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* Headline */}
      <motion.h2 
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-4xl md:text-5xl font-black bg-gradient-to-r from-neutral-200 via-white to-neutral-400 bg-clip-text text-transparent mb-6 leading-tight"
      >
        No Doctors Found
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-semibold text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed"
      >
        We couldn't find any doctors matching your search or filters.
      </motion.p>

      {/* Suggestions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-3xl p-8 mb-12 shadow-xl"
      >
        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-3 justify-center">
          <Zap className="w-6 h-6 text-yellow-400" />
          Try these suggestions:
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-2xl border border-neutral-700/50 hover:border-neutral-600 transition-all">
            <Search className="w-6 h-6 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-white mb-1">Broaden your search</p>
              <p className="text-neutral-400 text-sm">Try searching with fewer keywords or different spellings.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-neutral-800/50 rounded-2xl border border-neutral-700/50 hover:border-neutral-600 transition-all">
            <Filter className="w-6 h-6 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-white mb-1">Clear filters</p>
              <p className="text-neutral-400 text-sm">Remove specialty or location filters to see more options.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="px-12 py-5 bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-black font-bold text-lg rounded-3xl shadow-2xl hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-3 justify-center mx-auto sm:w-auto"
        >
          <Icon icon="mdi:reload" className="w-5 h-5" />
          Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-12 py-5 border-2 border-neutral-700/50 bg-neutral-900/50 backdrop-blur-sm rounded-3xl text-neutral-300 font-semibold text-lg hover:border-neutral-600 hover:bg-neutral-800/30 transition-all"
        >
          View All Doctors
        </motion.button>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-sm text-neutral-500 mt-12"
      >
        Need help?{' '}
        <span className="text-green-400 hover:underline cursor-pointer font-medium">
          Contact support
        </span>
      </motion.p>
    </motion.div>
  );
};

export default EmptyStateDoctors;

