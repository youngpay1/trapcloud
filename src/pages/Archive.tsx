import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { pastShows, type PastShow } from '@/data/shows';

const Archive = () => {
  const [expandedShow, setExpandedShow] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<Record<string, { src: string; type: 'video' | 'image' }>>({});
  const [syncTime, setSyncTime] = useState<number | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const toggleShow = (showId: string) => {
    if (expandedShow === showId) {
      setExpandedShow(null);
    } else {
      setExpandedShow(showId);
      const show = pastShows.find((s) => s.id === showId);
      if (show && !activeMedia[showId]) {
        if (show.videos && show.videos.length > 0) {
          setActiveMedia((prev) => ({ ...prev, [showId]: { src: show.videos![0], type: 'video' } }));
        } else if (show.images && show.images.length > 0) {
          setActiveMedia((prev) => ({ ...prev, [showId]: { src: show.images![0], type: 'image' } }));
        }
      }
    }
  };

  const setActiveMediaItem = (showId: string, src: string, type: 'video' | 'image', currentTime?: number) => {
    setActiveMedia((prev) => ({ ...prev, [showId]: { src, type } }));
    if (type === 'video' && currentTime !== undefined) {
      setSyncTime(currentTime);
    } else {
      setSyncTime(null);
    }
  };

  const handleMainVideoLoaded = useCallback(() => {
    if (mainVideoRef.current && syncTime !== null) {
      mainVideoRef.current.currentTime = syncTime;
      setSyncTime(null);
    }
  }, [syncTime]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Archive
        </p>

        {pastShows.length > 0 ? (
          <div className="space-y-0">
            {pastShows.map((show) => (
              <div key={show.id} className="border-b border-border/20 last:border-b-0">
                <div
                  onClick={() => toggleShow(show.id)}
                  className="w-full py-4 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="nav-link-group text-sm md:text-base uppercase tracking-widest">
                      {show.name.split(' — ')[0]}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground/50 transition-colors duration-300 group-hover:text-white">
                      {show.city}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: expandedShow === show.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="nav-link-group"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </div>

                <AnimatePresence>
                  {expandedShow === show.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="py-6">
                        {activeMedia[show.id] && (
                          <div className="mb-4">
                            {activeMedia[show.id].type === 'video' ? (
                              <video
                                ref={mainVideoRef}
                                key={activeMedia[show.id].src}
                                src={activeMedia[show.id].src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                onLoadedMetadata={handleMainVideoLoaded}
                                className="w-full aspect-video object-cover"
                              />
                            ) : (
                              <img
                                key={activeMedia[show.id].src}
                                src={activeMedia[show.id].src}
                                alt={show.name}
                                className="w-full aspect-video object-cover cursor-pointer"
                                onClick={() => setFullscreenImage(activeMedia[show.id].src)}
                              />
                            )}
                          </div>
                        )}

                        {(() => {
                          const allVideos = show.videos || [];
                          const allImages = show.images || [];
                          const hasMedia = allVideos.length > 0 || allImages.length > 0;

                          return hasMedia && (
                            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                              {allVideos.map((video, index) => {
                                const isActive = activeMedia[show.id]?.src === video;
                                return (
                                  <div
                                    key={`video-${index}`}
                                    className={`relative aspect-[4/3] overflow-hidden cursor-pointer transition-opacity duration-200 ${
                                      isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                                    }`}
                                    onClick={(e) => {
                                      const videoEl = e.currentTarget.querySelector('video');
                                      const currentTime = videoEl ? videoEl.currentTime : 0;
                                      setActiveMediaItem(show.id, video, 'video', currentTime);
                                    }}
                                  >
                                    <video
                                      src={video}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                );
                              })}
                              {allImages.map((image, index) => (
                                <div
                                  key={`image-${index}`}
                                  className={`relative aspect-[4/3] overflow-hidden cursor-pointer transition-opacity duration-200 ${
                                    activeMedia[show.id]?.src === image ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                                  }`}
                                  onClick={() => setActiveMediaItem(show.id, image, 'image')}
                                >
                                  <img
                                    src={image}
                                    alt={`${show.name} - ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 py-24">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              No past shows yet
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <span
              className="absolute top-4 right-4 nav-link cursor-pointer z-50"
              onClick={() => setFullscreenImage(null)}
            >
              <X className="w-6 h-6" />
            </span>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={fullscreenImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Archive;
