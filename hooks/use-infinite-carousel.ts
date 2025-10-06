import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteCarouselProps {
    speed?: number;
    direction?: 'left' | 'right';
    autoPlay?: boolean;
    pauseOnHover?: boolean;
}

export const useInfiniteCarousel = ({
    speed = 0.1,
    direction = 'left',
    autoPlay = true,
    pauseOnHover = true
}: UseInfiniteCarouselProps = {}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const startAnimation = useCallback(() => {
        if (!autoPlay || isPaused) return;

        const totalWidth = 100;

        const animate = () => {
            setScrollPosition(prev => {
                const nextPosition = direction === 'left' ? prev + speed : prev - speed;

                if (direction === 'left' && nextPosition >= totalWidth) {
                    return 0;
                } else if (direction === 'right' && nextPosition <= -totalWidth) {
                    return 0;
                }

                return nextPosition;
            });

            if (!isPaused && autoPlay) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        if (!isPaused && autoPlay) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
    }, [speed, direction, autoPlay, isPaused]);

    const stopAnimation = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    }, [pauseOnHover]);

    const reset = useCallback(() => {
        setScrollPosition(0);
    }, []);

    const pause = useCallback(() => {
        setIsPaused(true);
    }, []);

    const play = useCallback(() => {
        setIsPaused(false);
    }, []);

    useEffect(() => {
        startAnimation();
        return stopAnimation;
    }, [startAnimation, stopAnimation]);

    useEffect(() => {
        return () => {
            stopAnimation();
        };
    }, [stopAnimation]);

    return {
        scrollPosition,
        isPaused,
        containerRef,
        handleMouseEnter,
        handleMouseLeave,
        reset,
        pause,
        play,
        setScrollPosition
    };
};