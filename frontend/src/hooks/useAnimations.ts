'use client';

import { useEffect, useRef } from 'react';

export const useAuroraCursor = () => {
    const lastUpdate = useRef(0);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();

            // Throttle to 16ms (60fps)
            if (now - lastUpdate.current < 16) return;

            lastUpdate.current = now;

            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            animationFrameId.current = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;

                document.documentElement.style.setProperty('--x', `${x}%`);
                document.documentElement.style.setProperty('--y', `${y}%`);
            });
        };

        const handleVisibilityChange = () => {
            if (document.hidden && animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);
};

// Optimized Scroll Reveal Hook
export const useScrollReveal = (threshold = 0.1) => {
    const elementRef = useRef<HTMLElement>(null);
    const isVisible = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible.current) {
                    entry.target.classList.add('revealed');
                    isVisible.current = true;
                }
            },
            {
                threshold,
                rootMargin: '50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return elementRef;
};