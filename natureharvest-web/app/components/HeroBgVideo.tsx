import { motion } from "framer-motion";

interface HeroBgVideoProps {
  videoSrc?: string;
  fallbackImage?: string;
}

export default function HeroBgVideo({ videoSrc, fallbackImage }: HeroBgVideoProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          {fallbackImage && (
            <img 
              src={fallbackImage} 
              alt="Nature Harvest Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </video>
      ) : (
        /* Placeholder gradient when no video is provided */
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-900/60"></div>
      
      {/* Additional gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40"></div>
    </div>
  );
} 