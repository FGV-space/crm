import React, { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

const options = {
  particles: {
    number: {
      value: 80
    },
    color: {
      value: "#6b727d",
      animation: {
        enable: false,
        speed: 20,
        sync: false
      }
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 4,
      random: true,
      animation: {
        enable: true,
        speed: 16,
        minimumValue: 0.1,
        sync: false
      }
    },
    links: {
      enable: true,
      distance: 200,
      color: "random",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1
        }
      },
      repulse: {
        distance: 120
      },
      push: {
        quantity: 4
      },
      remove: {
        quantity: 2
      }
    }
  },
};

const ParticlesBackground = () => {
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  return (
    <Particles
      id="tsparticles"
      options={options}
    />
  );
}

export default React.memo(ParticlesBackground);
