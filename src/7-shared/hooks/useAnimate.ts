import { useState, useEffect } from 'react';

export default function useAnimate (
    delay: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [isAnimating, setIsAnimating] = useState(false);
      
    useEffect(() => {
    if (isAnimating) {
        const timer = setTimeout(() => setIsAnimating(false), delay);
        return () => clearTimeout(timer);
    }
    }, [isAnimating]);

    return [isAnimating, setIsAnimating];
};
