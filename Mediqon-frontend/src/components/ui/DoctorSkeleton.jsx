import React from 'react';
import { motion } from 'framer-motion';

const DoctorSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-3xl overflow-hidden h-96"
        >
          {/* Image Skeleton */}
          <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-900" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Name & Rating */}
            <div className="space-y-2">
              <div className="h-6 bg-neutral-800 rounded-lg w-3/4" />
              <div className="flex gap-2">
                <div className="h-4 bg-neutral-800 rounded w-1/2" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-neutral-800 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="h-4 bg-neutral-800 rounded w-2/3" />

            {/* Slots */}
            <div className="space-y-2">
              <div className="h-3 bg-neutral-800 rounded w-1/4" />
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-10 bg-neutral-800 rounded-xl" />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50">
              <div className="h-6 bg-neutral-800 rounded w-20" />
              <div className="h-11 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-2xl w-24" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DoctorSkeleton;

