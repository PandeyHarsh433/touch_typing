import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const Background = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#130f40",
          },
        },
        autoPlay: true,
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        detectRetina: true,
        duration: 0,
        fpsLimit: 120,
        interactivity: {
          detectsOn: "window",
          events: {
            onDiv: {
              selectors: "#repulse-div",
              enable: true,
              mode: "repulse",
              type: "rectangle",
            },
            resize: true,
          },
          modes: {},
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          gradient: [],
          groups: {},
          links: {
            color: {
              value: "#ffffff",
            },
            distance: 150,
            enable: true,
            frequency: 1,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
          },
          number: {
            density: {
              enable: true,
              area: 800,
              factor: 1000,
            },
            limit: 0,
            value: 80,
          },
          shape: {
            options: {},
            type: "circle",
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
        },
        detectRetina: true,
        fpsLimit: 60,
        responsive: [
          {
            breakpoint: {
              max: 768,
              min: 576,
            },
            options: {
              particles: {
                number: {
                  value: 50,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                size: {
                  value: 2,
                },
              },
            },
          },
          {
            breakpoint: {
              max: 576,
              min: 0,
            },
            options: {
              particles: {
                number: {
                  value: 30,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                size: {
                  value: 1,
                },
              },
            },
          },
        ],
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100wh",
        height: "100vh",
      }}
    />
  );
};

export default Background;
