import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, PartyPopper } from 'lucide-react';

const EMOJIS = ['✨', '💖', '⭐', '🎉'];

const createParticles = () =>
  Array.from({ length: 55 }).map((_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 12 + Math.random() * 20,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    drift: (Math.random() - 0.5) * 60,
  }));

// dispara vários bursts de confete em sequência, em vez de um só
function fireConfettiBursts() {
  const defaults = { origin: { y: 0.6 }, zIndex: 999 };

  confetti({
    ...defaults,
    particleCount: 300,
    spread: 160,
    startVelocity: 55,
  });

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 120,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      ...defaults,
      particleCount: 120,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.7 },
    });
  }, 250);

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 200,
      spread: 360,
      startVelocity: 35,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.3 },
    });
  }, 500);
}

// wrapper padrão pra cada tela, com entrada E saída animadas
function Screen({ children, screenKey }: { children: React.ReactNode; screenKey: number }) {
  return (
    <motion.div
      key={screenKey}
      initial={{ opacity: 0, scale: 0.6, y: 40, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -40, rotate: 4 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [opened, setOpened] = useState(false);
  const [particles] = useState(createParticles);

  function nextStep() {
    setStep((old) => old + 1);
  }

  function openGift() {
    setOpened(true);
    fireConfettiBursts();

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
      {/* PARTICULAS (agora com emojis variados e leve drift lateral) */}
      {particles.map((item) => (
        <motion.span
          key={item.id}
          className='absolute text-white select-none pointer-events-none'
          style={{ left: `${item.left}%`, fontSize: item.size }}
          initial={{ y: '110vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            x: [0, item.drift, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* brilho pulsante de fundo, dá profundidade extra */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.5), transparent 60%)',
        }}
      />

      <section className='relative z-10 w-full flex justify-center text-center'>
        <AnimatePresence mode='wait'>
          {/* =====================
              TELA 1
          ====================== */}
          {step === 1 && (
            <Screen screenKey={1}>
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <Heart size={120} fill='red' className='mx-auto text-red-500 drop-shadow-2xl' />
              </motion.div>

              <motion.h1
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className='mt-8 mb-10 text-5xl md:text-6xl font-black text-white drop-shadow-2xl'
              >
                Tenho uma surpresa
              </motion.h1>

              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.15, rotate: -2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ boxShadow: ['0 0 0px rgba(255,255,255,0.4)', '0 0 35px rgba(255,255,255,0.9)', '0 0 0px rgba(255,255,255,0.4)'] }}
                transition={{ boxShadow: { duration: 1.6, repeat: Infinity } }}
                className='bg-white text-pink-600 px-10 py-5 rounded-full text-xl font-black shadow-2xl'
              >
                Clique aqui ✨
              </motion.button>
            </Screen>
          )}

          {/* =====================
              TELA 2
          ====================== */}
          {step === 2 && (
            <Screen screenKey={2}>
              <div className='max-w-xl'>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <Sparkles size={90} className='mx-auto text-yellow-300 drop-shadow-xl' />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className='mt-6 text-5xl md:text-6xl font-black text-white drop-shadow-2xl'
                >
                  Feliz aniversário 🎂
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.03 }}
                  className='mt-8 bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl'
                >
                  <p className='text-xl md:text-2xl text-white font-medium'>
                    Que seu dia seja cheio de alegria, sorrisos e momentos especiais
                  </p>
                  <motion.p
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className='mt-5 text-yellow-200 text-xl font-bold'
                  >
                    Você merece tudo de melhor ✨
                  </motion.p>
                </motion.div>

                <motion.button
                  onClick={nextStep}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className='mt-10 bg-linear-to-r from-pink-500 to-red-500 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl'
                >
                  Continuar 💖
                </motion.button>
              </div>
            </Screen>
          )}

          {/* =====================
              TELA 3 - SUSPENSE
          ====================== */}
          {step === 3 && (
            <Screen screenKey={3}>
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className='text-8xl'
              >
                🎁
              </motion.div>

              <motion.h1
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className='mt-8 text-5xl md:text-6xl font-black text-white drop-shadow-2xl'
              >
                Tenho algo especial para você ✨
              </motion.h1>

              <motion.p
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className='mt-5 text-xl md:text-2xl text-yellow-200'
              >
                Uma surpresa feita com carinho ❤️
              </motion.p>

              <motion.button
                onClick={nextStep}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ scale: { duration: 1.2, repeat: Infinity } }}
                className='mt-10 bg-white text-pink-600 px-10 py-4 rounded-full text-xl font-black shadow-2xl'
              >
                Abrir presente 🎁
              </motion.button>
            </Screen>
          )}

          {/* =====================
              TELA 4 - PRESENTE
          ====================== */}
          {step === 4 && (
            <Screen screenKey={4}>
              <motion.button onClick={openGift} disabled={opened} className='relative'>
                <div className='relative w-80 h-72'>
                  {/* TAMPA */}
                  <motion.div
                    animate={
                      opened
                        ? { y: -260, rotate: -25, scale: 1.15, opacity: 0 }
                        : { y: [0, -14, 0], rotate: [0, -3, 3, 0] }
                    }
                    transition={
                      opened
                        ? { duration: 0.4, ease: 'easeOut' }
                        : { duration: 1.6, repeat: Infinity }
                    }
                    className='absolute -top-10 w-full h-24 rounded-3xl bg-linear-to-r from-yellow-300 via-pink-400 to-red-500 shadow-[0_0_40px_rgba(255,255,255,.5)] border-4 border-white/30 z-20'
                  />

                  {/* CORPO */}
                  <motion.div
                    animate={opened ? { scale: [1, 1.15, 1] } : { scale: [1, 1.02, 1] }}
                    transition={{ duration: opened ? 0.4 : 2, repeat: opened ? 0 : Infinity }}
                    className='absolute bottom-0 w-full h-52 rounded-3xl bg-linear-to-br from-purple-700 via-pink-600 to-red-600 shadow-2xl overflow-hidden'
                  >
                    <div className='absolute left-1/2 -translate-x-1/2 w-14 h-full bg-yellow-300' />

                    <motion.div
                      animate={{ x: ['-120%', '120%'] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className='absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30'
                    />
                  </motion.div>

                  {/* LAÇO */}
                  <motion.div
                    animate={
                      opened
                        ? { y: -280, scale: 2, rotate: 420, opacity: 0 }
                        : { rotate: [0, 5, -5, 0] }
                    }
                    transition={
                      opened
                        ? { duration: 0.5, ease: 'easeOut' }
                        : { duration: 2, repeat: Infinity }
                    }
                    className='absolute -top-36 left-1/2 -translate-x-1/2 text-8xl'
                  >
                    🎀
                  </motion.div>

                  {/* EXPLOSÃO DE BRILHOS AO ABRIR */}
                  {opened && (
                    <>
                      {[
                        { icon: '✨', x: 'left-4', delay: 0 },
                        { icon: '⭐', x: 'right-4', delay: 0.08 },
                        { icon: '💖', x: 'left-1/2 -translate-x-1/2', delay: 0.16 },
                        { icon: '🎉', x: 'left-16', delay: 0.24 },
                        { icon: '🎊', x: 'right-16', delay: 0.3 },
                      ].map((p, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 1], y: -160 }}
                          transition={{ duration: 0.9, delay: p.delay }}
                          className={`absolute ${p.x} top-0 text-6xl`}
                        >
                          {p.icon}
                        </motion.span>
                      ))}
                    </>
                  )}
                </div>

                {!opened && (
                  <motion.p
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className='mt-8 text-white font-black text-xl drop-shadow-xl'
                  >
                    ✨ Toque para abrir ✨
                  </motion.p>
                )}
              </motion.button>
            </Screen>
          )}

          {/* =====================
              TELA 5 - STORY
          ====================== */}
          {step === 5 && (
            <Screen screenKey={5}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className='relative w-87.5 h-155 rounded-[2.5rem] overflow-hidden shadow-2xl bg-black'
              >
                <motion.img
                  src='/foto.jpeg'
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  className='absolute inset-0 w-full h-full object-cover'
                />

                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20' />

                <motion.div
                  animate={{ y: [0, -16, 0], scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='absolute top-28 right-6 text-5xl z-20'
                >
                  ❤️
                </motion.div>

                {/* estrelinhas comemorativas surgindo ao redor da foto */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className='absolute top-6 left-6 z-20'
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    <Star size={32} className='text-yellow-300' fill='currentColor' />
                  </motion.div>
                </motion.div>

                <div className='absolute bottom-0 left-0 right-0 p-8 pt-28 text-center z-20 bg-linear-to-t from-black/90 via-black/30 to-transparent'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <PartyPopper size={40} className='mx-auto text-yellow-300 mb-2' />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className='mt-3 text-white text-lg drop-shadow-xl'
                  >
                    Consegui a foto do dia que você conheceu o Justin Bieber ✨
                  </motion.p>
                </div>
              </motion.div>
            </Screen>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
