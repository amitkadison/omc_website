import React, { useEffect, useState } from 'react';

const Confetti = ({ trigger, duration = 3000 }) => {
  const [particles, setParticles] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      createConfetti();
    }
  }, [trigger]);

  const createConfetti = () => {
    setIsActive(true);
    const newParticles = [];
    
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: ['#00E5FF', '#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        gravity: 0.3,
        life: 1,
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
      });
    }
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
    }, duration);
  };

  useEffect(() => {
    if (!isActive) return;

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + particle.gravity,
          rotation: particle.rotation + particle.rotationSpeed,
          life: particle.life - 0.01
        })).filter(particle => particle.y < window.innerHeight + 50 && particle.life > 0)
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 9999
    }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : '0%',
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.life,
            clipPath: particle.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

export const ConfettiButton = ({ children, onClick, ...props }) => {
  const [triggerConfetti, setTriggerConfetti] = useState(0);

  const handleClick = (e) => {
    setTriggerConfetti(prev => prev + 1);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <button {...props} onClick={handleClick}>
        {children}
      </button>
      <Confetti trigger={triggerConfetti} />
    </>
  );
};

export default Confetti;
