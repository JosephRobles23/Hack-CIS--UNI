import React from 'react';
import ProfileCard from './ProfileCard';
import styles from './infinite-profile-carousel.module.css';
import { useInfiniteCarousel } from '../hooks/use-infinite-carousel';

interface ProfileData {
  id: string;
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  profileUrl?: string;
  onContactClick?: () => void;
}

interface InfiniteProfileCarouselProps {
  profiles: ProfileData[];
  visibleItems?: number;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  direction?: 'left' | 'right';
  gap?: number;
  fadeWidth?: number;
  autoPlay?: boolean;
}

const InfiniteProfileCarousel: React.FC<InfiniteProfileCarouselProps> = ({
  profiles,
  visibleItems = 3,
  speed = 0.1,
  pauseOnHover = true,
  className = '',
  direction = 'left',
  gap = 16,
  fadeWidth = 80,
  autoPlay = true
}) => {
  const {
    scrollPosition,
    containerRef,
    handleMouseEnter,
    handleMouseLeave
  } = useInfiniteCarousel({
    speed,
    direction,
    autoPlay,
    pauseOnHover
  });

  // Duplicar contenido para scroll infinito
  const duplicatedProfiles = [...profiles, ...profiles];

  return (
    <div 
      ref={containerRef}
      className={`${styles.infiniteCarouselContainer} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradientes de desvanecimiento */}
      <div 
        className={`${styles.fadeGradient} ${styles.fadeLeft}`}
        style={{ width: `${fadeWidth}px` }}
      />
      <div 
        className={`${styles.fadeGradient} ${styles.fadeRight}`}
        style={{ width: `${fadeWidth}px` }}
      />
      
      {/* Contenedor que se desplaza */}
      <div 
        className={styles.carouselTrack}
        style={{
          transform: `translateX(-${scrollPosition}%)`,
          width: `${(duplicatedProfiles.length / visibleItems) * 30}%`,
          gap: `${gap}px`
        }}
      >
        {duplicatedProfiles.map((profile, index) => (
          <div 
            key={`${profile.id}-${index}`}
            className={styles.carouselItem}
            style={{ 
              width: `${100 / visibleItems}%`,
              paddingLeft: `${gap / 2}px`,
              paddingRight: `${gap / 2}px`
            }}
          >
            <ProfileCard
              avatarUrl={profile.avatarUrl}
              iconUrl={profile.iconUrl}
              grainUrl={profile.grainUrl}
              behindGradient={profile.behindGradient}
              innerGradient={profile.innerGradient}
              showBehindGradient={profile.showBehindGradient}
              enableTilt={profile.enableTilt}
              enableMobileTilt={profile.enableMobileTilt}
              mobileTiltSensitivity={profile.mobileTiltSensitivity}
              miniAvatarUrl={profile.miniAvatarUrl}
              name={profile.name}
              title={profile.title}
              handle={profile.handle}
              status={profile.status}
              contactText={profile.contactText}
              showUserInfo={profile.showUserInfo}
              profileUrl={profile.profileUrl}
              onContactClick={profile.onContactClick}
              className={styles.carouselProfileCard}
            />
          </div>
        ))}
      </div>


    </div>
  );
};

export default InfiniteProfileCarousel;