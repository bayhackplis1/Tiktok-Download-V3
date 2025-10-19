import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const container = canvasRef.current;
    
    // Create matrix characters
    for (let i = 0; i < 30; i++) {
      const span = document.createElement("span");
      span.className = "matrix-char";
      span.textContent = characters[Math.floor(Math.random() * characters.length)];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${5 + Math.random() * 10}s`;
      span.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(span);
    }

    // Update characters periodically
    const interval = setInterval(() => {
      const chars = container.querySelectorAll(".matrix-char");
      chars.forEach((char) => {
        if (Math.random() > 0.95) {
          char.textContent = characters[Math.floor(Math.random() * characters.length)];
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
      container.innerHTML = "";
    };
  }, []);

  return <div ref={canvasRef} className="matrix-rain" />;
}
