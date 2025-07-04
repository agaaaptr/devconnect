'use client';

import { useEffect } from 'react';

export const AuroraCursor = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            // Update CSS custom properties for aurora effect
            document.documentElement.style.setProperty('--x', `${x}%`);
            document.documentElement.style.setProperty('--y', `${y}%`);
        };

        // Throttle mousemove events for better performance
        let ticking = false;
        const throttledMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleMouseMove(e);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
        };
    }, []);

    return null; // This component doesn't render anything
};

// Optional: Export as a hook for use in other components
export const useAuroraCursor = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            document.documentElement.style.setProperty('--x', `${x}%`);
            document.documentElement.style.setProperty('--y', `${y}%`);
        };

        let ticking = false;
        const throttledMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleMouseMove(e);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
        };
    }, []);
};