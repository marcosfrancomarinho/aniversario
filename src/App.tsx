import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

const createParticles = () =>
  Array.from({ length: 40 }).map((_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 12 + Math.random() * 18,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 4,
  }));

export default function App() {
  const [step, setStep] = useState(1);
  const [opened, setOpened] = useState(false);
  const [particles] = useState(createParticles);

  function nextStep() {
    setStep((old) => old + 1);
  }

  function openGift() {
    setOpened(true);

    confetti({
      particleCount: 500,
      spread: 180,
      startVelocity: 60,

      origin: {
        y: 0.6,
      },
    });

    setTimeout(() => {
      setStep(5);
    }, 900);
  }

  return (
    <main
      className='
      min-h-screen

      overflow-hidden

      relative

      flex

      items-center

      justify-center

      p-5


      bg-linear-to-br

      from-pink-500

      via-purple-600

      to-blue-500


      bg-size-[400%_400%]

      animate-gradient
      '
    >
      {/* PARTICULAS */}

      {particles.map((item) => (
        <motion.span
          key={item.id}
          className='
          absolute

          text-white
          '
          style={{
            left: `${item.left}%`,
            fontSize: item.size,
          }}
          initial={{
            y: '100vh',
            opacity: 0,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✨
        </motion.span>
      ))}

      <section
        className='
        relative

        z-10

        w-full

        flex

        justify-center

        text-center
        '
      >
        {/* =====================
            TELA 1
        ====================== */}

        {step === 1 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Heart
                size={120}
                fill='red'
                className='
                mx-auto

                text-red-500

                drop-shadow-2xl
                '
              />
            </motion.div>

            <h1
              className='
              mt-8

              mb-10

              text-5xl

              md:text-6xl

              font-black

              text-white

              drop-shadow-2xl
              '
            >
              Tenho uma surpresa
            </h1>

            <motion.button
              onClick={nextStep}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className='
              bg-white

              text-pink-600

              px-10

              py-5

              rounded-full

              text-xl

              font-black

              shadow-2xl
              '
            >
              Clique aqui ✨
            </motion.button>
          </motion.div>
        )}

        {/* =====================
            TELA 2
        ====================== */}

        {step === 2 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className='
            max-w-xl
            '
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],

                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles
                size={90}
                className='
                mx-auto

                text-yellow-300

                drop-shadow-xl
                '
              />
            </motion.div>

            <h1
              className='
              mt-6

              text-5xl

              md:text-6xl

              font-black

              text-white

              drop-shadow-2xl
              '
            >
              Feliz aniversário 🎂
            </h1>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className='
              mt-8

              bg-white/20

              backdrop-blur-xl

              rounded-3xl

              p-8

              shadow-2xl
              '
            >
              <p
                className='
                text-xl

                md:text-2xl

                text-white

                font-medium
                '
              >
                Que seu dia seja cheio de alegria, sorrisos e momentos especiais
              </p>

              <p
                className='
                mt-5

                text-yellow-200

                text-xl

                font-bold
                '
              >
                Você merece tudo de melhor ✨
              </p>
            </motion.div>

            <motion.button
              onClick={nextStep}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className='
              mt-10

              bg-linear-to-r

              from-pink-500

              to-red-500


              text-white

              px-10

              py-4


              rounded-full


              text-xl


              font-bold


              shadow-xl
              '
            >
              Continuar 💖
            </motion.button>
          </motion.div>
        )}
        {/* =====================
            TELA 3 - SUSPENSE
        ====================== */}

        {step === 3 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
              duration: 0.8,
            }}
          >
            <motion.div
              animate={{
                y: [0, -15, 0],

                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className='
              text-8xl
              '
            >
              🎁
            </motion.div>

            <h1
              className='
              mt-8

              text-5xl

              md:text-6xl

              font-black

              text-white

              drop-shadow-2xl
              '
            >
              Tenho algo especial para você ✨
            </h1>

            <p
              className='
              mt-5

              text-xl

              md:text-2xl

              text-yellow-200
              '
            >
              Uma surpresa feita com carinho ❤️
            </p>

            <motion.button
              onClick={nextStep}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className='
              mt-10

              bg-white

              text-pink-600

              px-10

              py-4

              rounded-full

              text-xl

              font-black

              shadow-2xl
              '
            >
              Abrir presente 🎁
            </motion.button>
          </motion.div>
        )}

        {/* =====================
            TELA 4 - PRESENTE
        ====================== */}

        {step === 4 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
            }}
          >
            <motion.button
              onClick={openGift}
              disabled={opened}
              className='
              relative
              '
            >
              <div
                className='
                relative

                w-80

                h-72
                '
              >
                {/* TAMPA */}

                <motion.div
                  animate={
                    opened
                      ? {
                          y: -250,
                          rotate: -20,
                          scale: 1.05,
                        }
                      : {
                          y: [0, -10, 0],
                        }
                  }
                  transition={
                    opened
                      ? {
                          duration: 0.35,
                          ease: 'easeOut',
                        }
                      : {
                          duration: 2,
                          repeat: Infinity,
                        }
                  }
                  className='
                  absolute

                  -top-10

                  w-full

                  h-24

                  rounded-3xl


                  bg-linear-to-r

                  from-yellow-300

                  via-pink-400

                  to-red-500



                  shadow-[0_0_40px_rgba(255,255,255,.5)]


                  border-4

                  border-white/30


                  z-20

                  '
                />

                {/* CORPO */}

                <motion.div
                  animate={
                    opened
                      ? {
                          scale: [1, 1.08, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.35,
                  }}
                  className='
                  absolute

                  bottom-0

                  w-full

                  h-52


                  rounded-3xl


                  bg-linear-to-br

                  from-purple-700

                  via-pink-600

                  to-red-600



                  shadow-2xl


                  overflow-hidden
                  '
                >
                  {/* FITA CENTRAL */}

                  <div
                    className='
                    absolute

                    left-1/2

                    -translate-x-1/2


                    w-14

                    h-full


                    bg-yellow-300
                    '
                  />

                  {/* BRILHO */}

                  <motion.div
                    animate={{
                      x: ['-120%', '120%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className='
                    absolute

                    inset-0


                    bg-linear-to-r

                    from-transparent

                    via-white

                    to-transparent


                    opacity-30
                    '
                  />
                </motion.div>

                {/* LAÇO */}

                <motion.div
                  animate={
                    opened
                      ? {
                          y: -260,
                          scale: 1.7,
                          rotate: 360,
                          opacity: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.45,
                    ease: 'easeOut',
                  }}
                  className='
                  absolute

                  -top-36

                  left-1/2

                  -translate-x-1/2


                  text-8xl

                  '
                >
                  🎀
                </motion.div>

                {/* PEQUENOS BRILHOS */}

                {opened && (
                  <>
                    <motion.span
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: -100,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className='
                      absolute

                      left-8

                      top-0

                      text-6xl
                      '
                    >
                      ✨
                    </motion.span>

                    <motion.span
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: -100,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1,
                      }}
                      className='
                      absolute

                      right-8

                      top-0

                      text-6xl
                      '
                    >
                      ⭐
                    </motion.span>
                  </>
                )}
              </div>

              {!opened && (
                <motion.p
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className='
                  mt-8

                  text-white

                  font-black

                  text-xl

                  drop-shadow-xl
                  '
                >
                  ✨ Toque para abrir ✨
                </motion.p>
              )}
            </motion.button>
          </motion.div>
        )}
        {/* =====================
            TELA 5 - STORY
        ====================== */}

        {step === 5 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className='
              relative

              w-87.5

              h-155

              rounded-[2.5rem]

              overflow-hidden

              shadow-2xl

              bg-black
              '
            >
              {/* FOTO PRINCIPAL */}

              <motion.img
                src='/foto.jpeg'
                initial={{
                  scale: 1.15,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                }}
                className='
                absolute

                inset-0

                w-full

                h-full

                object-cover
                '
              />

              {/* SOMBRA PARA LEITURA */}

              <div
                className='
                absolute

                inset-0


                bg-linear-to-t

                from-black/80

                via-transparent

                to-black/20
                '
              />

              {/* CORAÇÃO */}

              <motion.div
                animate={{
                  y: [0, -12, 0],

                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className='
                absolute

                top-28

                right-6

                text-5xl

                z-20
                '
              >
                ❤️
              </motion.div>

              {/* TEXTO FINAL */}

              <div
                className='
                absolute

                bottom-0

                left-0

                right-0


                p-8

                pt-28


                text-center


                z-20

                bg-linear-to-t

                from-black/90

                via-black/30

                to-transparent

                '
              >
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.8,
                  }}
                  className='
                  mt-3

                  text-white

                  text-lg

                  drop-shadow-xl

                  '
                >
                  Consegui a foto do dia que você conheceu o Justin Bieber ✨
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
