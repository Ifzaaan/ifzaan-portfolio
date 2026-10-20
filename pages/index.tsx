import Head from 'next/head';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Linkedin, MapPin, Building2, BookOpen, BrainCircuit, Smartphone, Heart, Menu, X, ArrowDown, ChevronLeft, ChevronRight, ExternalLink, Phone } from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
  })
};

// --- COMPONENTS ---
const GrainOverlay = () => <div className="grain-overlay" />;

const AnimatedBlobs = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brass/10 rounded-full blur-[120px]"
        animate={{ x: [0, 100, -50, 0], y: [0, -50, 100, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-plum/10 rounded-full blur-[100px]"
        animate={{ x: [0, -80, 50, 0], y: [0, 80, -60, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 150 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 150 });

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 200 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 200 });

  const trailX = useSpring(mouseX, { stiffness: 300, damping: 100 });
  const trailY = useSpring(mouseY, { stiffness: 300, damping: 100 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('a, button, [data-cursor="hover"]')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brass rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block border border-brass/50"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Cursor trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brass/30 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};
// const CustomCursor = () => {
//   const mouseX = useMotionValue(-100);
//   const mouseY = useMotionValue(-100);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//     const handleMouseMove = (e: MouseEvent) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest('a, button, [data-cursor="hover"]')) {
//         setIsHovering(true);
//       } else {
//         setIsHovering(false);
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseover', handleMouseOver);
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, [mouseX, mouseY]);

//   return (
//     <>
//       {/* Main cursor dot */}
//       <motion.div
//         className="fixed top-0 left-0 w-3 h-3 bg-brass rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
//         style={{
//           x: useSpring(mouseX, { stiffness: 1000, damping: 200 }),
//           y: useSpring(mouseY, { stiffness: 1000, damping: 200 }),
//           translateX: '-50%',
//           translateY: '-50%',
//         }}
//       />
      
//       {/* Outer cursor ring */}
//       <motion.div
//         className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block border border-brass/50 ${
//           isHovering ? 'w-16 h-16' : 'w-8 h-8'
//         }`}
//         style={{
//           x: useSpring(mouseX, { stiffness: 500, damping: 150 }),
//           y: useSpring(mouseY, { stiffness: 500, damping: 150 }),
//           translateX: '-50%',
//           translateY: '-50%',
//           transition: {
//             duration: 0.2
//           }
//         }}
//       />
      
//       {/* Cursor trail effect */}
//       <motion.div
//         className="fixed top-0 left-0 w-2 h-2 bg-brass/30 rounded-full pointer-events-none z-[9997] hidden md:block"
//         style={{
//           x: useSpring(mouseX, { stiffness: 300, damping: 100 }),
//           y: useSpring(mouseY, { stiffness:300, damping: 100 }),
//           translateX: '-50%',
//           translateY: '-50%',
//         }}
//       />
//     </>
//   );
// };

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#work' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ink/90 backdrop-blur-xl border-b border-bone/10' : 'bg-transparent'}`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        <motion.a href="#" className="font-display text-xl font-bold tracking-tightest text-bone hover:text-brass transition-colors" whileHover={{ scale: 1.05 }}>
          IFZAAN<span className="text-brass">.</span>
        </motion.a>
        <div className="hidden md:flex space-x-10">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="font-mono-editorial text-xs tracking-[0.2em] text-bone-dim hover:text-brass transition-colors duration-300 uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>
        <button className="md:hidden text-bone" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-ink-2 border-b border-bone/10"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg tracking-widest text-bone-dim hover:text-brass"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  
  const greetings = [
    "HELLO",
    "HOLA", 
    "SALAM",
    "BONJOUR"
  ];
  
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 1500);
    
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 7500); // Stop after cycling through all greetings
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-ink">
      <AnimatedBlobs />
      <motion.div style={{ y: y1, opacity }} className="max-w-[1600px] mx-auto px-6 md:px-12 w-full z-10">
        {/* Multi-language greeting */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 h-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentGreeting}
              className="font-mono-editorial text-brass text-sm md:text-base tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -40, rotateX: 90 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {greetings[currentGreeting]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[15vw] md:text-[12vw] leading-[0.85] font-black tracking-tightest text-bone overflow-hidden"
        >
          <span className="block">IFZAAN</span>
          <motion.span
            className="block animate-gradient-text"
            initial={{ backgroundPosition: "200% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 2, delay: 1 }}
          >
            SHAIKH
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 font-serif-editorial italic text-xl md:text-3xl text-bone/80 max-w-2xl leading-relaxed"
        >
          "I don't just manage products.<br />
          <motion.span
            className="inline-block text-bone"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            I build them.
          </motion.span>"
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-12">
          <motion.a
            href="#work"
            className="inline-flex items-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-ink bg-brass px-8 py-4 hover:bg-brass/90 transition-colors uppercase"
            whileHover={{ scale: 1.05, x: 2, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            VIEW WORK
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-6 md:left-12 z-10" style={{ y: useTransform(scrollY, [0, 1000], [0, -100]) }}>
        <motion.button className="flex items-center gap-3 font-mono-editorial text-xs tracking-[0.2em] text-bone-dim uppercase bg-transparent border-none cursor-pointer" data-cursor="hover">
          SCROLL
          <ArrowDown className="w-4 h-4 animate-bob" />
        </motion.button>
      </motion.div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="py-32 md:py-48 bg-ink relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24 items-center">
          <motion.div className="md:col-span-5" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brass/30 to-plum/30 rounded-2xl blur-2xl" />
              <motion.div className="relative rounded-2xl overflow-hidden border border-bone/10 aspect-[3/4]" whileHover={{ scale: 1.02 }}>
                <img src="/ifzaan-shaikh-image.jpeg" alt="Ifzaan Shaikh" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono-editorial text-brass text-xs tracking-[0.2em] uppercase mb-1">Product Builder</p>
                  <p className="font-display text-bone font-semibold">Based in Goa, India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="md:col-span-7">
            <motion.h2 initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold tracking-tight text-bone mb-8">
              From Code<br /><span className="text-brass">to Strategy.</span>
            </motion.h2>
            <motion.p initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0} variants={fadeUpStagger} className="font-serif-editorial text-xl md:text-2xl text-bone/70 leading-relaxed mb-6">
              My journey didn't start in a boardroom. It started in the trenches of technical operations, evolved through deep AI research, and culminated in product leadership.
            </motion.p>
            <motion.p initial="hidden" animate={isInView ? "visible" : "hidden"} custom={1} variants={fadeUpStagger} className="text-lg text-bone-dim leading-relaxed mb-8">
              I bridge the gap between technology, clients, and business outcomes. I build strong client relationships, understand the problems behind the requirements, and turn them into clear product direction. From the first conversation to production, I bring teams together and make sure we deliver solutions that create real value.
            </motion.p>
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} custom={2} variants={fadeUpStagger} className="grid grid-cols-2 gap-4 border-t border-bone/10 pt-8">
              {['AI Product Development', 'Enterprise Solutions', 'Cross-functional Leadership', 'Product Delivery'].map((item, i) => (
                <motion.div key={item} className="flex items-center gap-3 text-bone/80 text-sm tracking-wide" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + (i * 0.1) }}>
                  <motion.div className="w-1.5 h-1.5 bg-brass rounded-full" whileHover={{ scale: 2 }} />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- ENHANCED BROWSER FRAME COMPONENT ---
const BrowserFrame = ({ children, url = "susegad.co.in", figNum, caption }: { children: React.ReactNode; url?: string; figNum: string; caption: string }) => (
  <motion.figure
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group relative"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-brass/20 to-teal/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-700 blur-md" />
    <div className="relative border border-bone/10 bg-ink-2 overflow-hidden rounded-xl group-hover:border-brass/30 transition-colors duration-500">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-bone/10 bg-ink/80 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <div className="ml-3 font-mono-editorial text-[10px] text-bone-dim/70 tracking-wide bg-bone/5 px-3 py-1 rounded-md border border-bone/5">
          {url}
        </div>
      </div>
      <div className="overflow-hidden bg-ink">
        <div className="group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {children}
        </div>
      </div>
    </div>
    <figcaption className="mt-4 flex items-baseline gap-3 px-1">
      <span className="font-mono-editorial text-[10px] tracking-[0.15em] text-brass uppercase">{figNum}</span>
      <span className="font-serif-editorial text-sm text-bone-dim italic">{caption}</span>
    </figcaption>
  </motion.figure>
);

// --- PHONE MOCKUP WITH SCREENSHOT CAROUSEL ---
const PhoneMockupCarousel = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const screenshots = [
    { src: '/noorjehan-1.jpeg', label: 'Splash Screen' },
    { src: '/noorjehan-2.jpeg', label: 'Categories' },
    { src: '/noorjehan-3.jpeg', label: 'Qibla Compass' },
    { src: '/noorjehan-4.jpeg', label: 'Home Dashboard' },
    { src: '/noorjehan-5.jpeg', label: 'Holy Quran' },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screenshots.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, screenshots.length]);

  const goTo = (index: number) => {
    setCurrentScreen(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const next = () => goTo((currentScreen + 1) % screenshots.length);
  const prev = () => goTo((currentScreen - 1 + screenshots.length) % screenshots.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotateY: 5, scale: 1.02 }}
      className="relative w-[260px] md:w-[300px] mx-auto"
    >
      {/* Phone Frame */}
      <div className="relative bg-ink-2 rounded-[40px] p-3 shadow-2xl shadow-plum/30 border-4 border-plum">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-plum rounded-b-2xl z-30" />
        <div className="relative bg-gradient-to-b from-ivory to-white rounded-[32px] overflow-hidden aspect-[9/19]">
          {/* Screenshot Carousel */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentScreen}
              src={screenshots[currentScreen].src}
              alt={screenshots[currentScreen].label}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-plum/80 backdrop-blur-sm rounded-full flex items-center justify-center z-20 hover:bg-plum transition-colors"
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-plum/80 backdrop-blur-sm rounded-full flex items-center justify-center z-20 hover:bg-plum transition-colors"
            aria-label="Next screen"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Screen Label */}
          <motion.div
            key={`label-${currentScreen}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-plum/90 backdrop-blur-sm px-3 py-1 rounded-full z-20"
          >
            <span className="font-mono-editorial text-[9px] tracking-wider text-gold uppercase">
              {screenshots[currentScreen].label}
            </span>
          </motion.div>

          {/* Dot Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentScreen ? 'w-6 bg-gold' : 'w-1.5 bg-plum/40 hover:bg-plum/60'
                }`}
                aria-label={`Go to screen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <>
      {/* BUILT INDEX */}
      <section id="work" ref={ref} className="py-32 md:py-48 bg-ink relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} className="mb-20">
            <p className="font-mono-editorial text-brass text-sm tracking-[0.3em] uppercase mb-4">Selected Work</p>
            <h2 className="font-display text-5xl md:text-8xl font-black tracking-tightest text-bone">
              BUILT BY <span className="text-bone/20">ME</span>
            </h2>
            <motion.p className="mt-6 font-serif-editorial italic text-xl md:text-2xl text-bone-dim max-w-xl" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              Two products. Two very different problems. One unified approach to building.
            </motion.p>
          </motion.div>

          <div className="border-t border-bone/10">
  {/* SUSEGAD CARD - HOVER TO REVEAL */}
  <motion.a
    href="#susegad"
    className="group block border-b border-bone/10 py-8 hover:bg-bone/[0.02] transition-all duration-500"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-mono-editorial text-xs text-bone-dim tracking-widest">01</span>
        <h3 className="font-display text-3xl md:text-5xl font-bold text-bone group-hover:text-brass transition-colors duration-500">
          SUSEGAD
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono-editorial text-xs text-teal tracking-widest uppercase hidden md:block">
          Property Management / SaaS
        </span>
        <ArrowUpRight className="w-5 h-5 text-bone-dim group-hover:text-brass group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
      </div>
    </div>
    
    {/* HIDDEN DESCRIPTION - REVEALS ON HOVER */}
    <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
      <p className="font-serif-editorial italic text-base md:text-lg text-bone-dim mt-4 pl-12 max-w-2xl">
        A modern property management platform designed to simplify operations for rental and property managers. Built for scale, automation, and flawless guest experiences.
      </p>
      <div className="flex flex-wrap gap-2 mt-3 pl-12">
        {['Dashboard', 'Properties', 'Tenants', 'Units', 'Invoices', 'Analytics'].map((tag) => (
          <span key={tag} className="font-mono-editorial text-[10px] tracking-[0.1em] px-3 py-1 border border-bone/10 text-bone-dim rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.a>

  {/* NOORJEHAN CARD - HOVER TO REVEAL */}
  <motion.a
    href="#noorjehan"
    className="group block border-b border-bone/10 py-8 hover:bg-bone/[0.02] transition-all duration-500"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-mono-editorial text-xs text-bone-dim tracking-widest">02</span>
        <h3 className="font-display text-3xl md:text-5xl font-bold text-bone group-hover:text-plum transition-colors duration-500">
          NOORJEHAN
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono-editorial text-xs text-plum tracking-widest uppercase hidden md:block">
          Quran • Dua • Dhikr
        </span>
        <ArrowUpRight className="w-5 h-5 text-bone-dim group-hover:text-plum group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
      </div>
    </div>
    
    {/* HIDDEN DESCRIPTION - REVEALS ON HOVER */}
    <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
      <p className="font-serif-editorial italic text-base md:text-lg text-bone-dim mt-4 pl-12 max-w-2xl">
        A personal Islamic mobile application created as a Sadaqah Jariyah in honor of my mother. A labor of love combining faith, technology, and daily remembrance.
      </p>
      <div className="flex flex-wrap gap-2 mt-3 pl-12">
        {['Quran', 'Prayer Times', 'Qibla', 'Dua', 'Dhikr', 'Hadith'].map((tag) => (
          <span key={tag} className="font-mono-editorial text-[10px] tracking-[0.1em] px-3 py-1 border border-bone/10 text-bone-dim rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.a>
</div>
        </div>
      </section>

      {/* SUSEGAD - DARK TECH SECTION */}
      <section id="susegad" className="py-32 md:py-48 bg-ink-2 border-y border-bone/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brass/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-20">
            <div className="md:col-span-5">
              <motion.span className="font-mono-editorial text-xs tracking-[0.3em] text-bone/30 uppercase mb-4 block" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Project 01
              </motion.span>
              <div className="flex items-center gap-6 mb-4">
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 bg-bone/5 backdrop-blur-sm rounded-xl p-3 border border-bone/10 flex items-center justify-center shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(184,135,74,0.5)' }}
                >
                  <img src="/Susegad-Logo.png" alt="Susegad Logo" className="w-full h-auto" />
                </motion.div>
                <motion.h3
                  className="font-display text-5xl md:text-7xl font-black tracking-tight text-bone"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  SUSEGAD
                </motion.h3>
              </div>
              <motion.p className="font-mono-editorial text-xs tracking-[0.2em] text-teal uppercase" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                Property Management / SaaS
              </motion.p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <motion.p className="font-serif-editorial text-xl md:text-2xl text-bone/80 leading-relaxed mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                A modern property management platform designed to simplify operations for rental and property managers. Built for scale, automation, and flawless guest experiences.
              </motion.p>
              <motion.div className="flex flex-wrap gap-2 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                {['Dashboard', 'Properties', 'Tenants', 'Units', 'Invoices', 'Analytics'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="font-mono-editorial text-[11px] tracking-[0.1em] px-4 py-2 border border-bone/10 text-bone-dim hover:border-brass/40 hover:bg-brass/10 hover:text-bone transition-all cursor-default rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + (i * 0.05) }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
              <motion.a
                href="https://susegad.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-ink bg-brass px-7 py-4 hover:bg-brass/90 transition-colors uppercase rounded-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05, x: 2, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                EXPLORE PLATFORM
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <BrowserFrame figNum="FIG. 01" caption="Operations dashboard with real-time metrics" url="susegad.co.in/dashboard">
              <img src="/susegad-dashboard.png" alt="Susegad Dashboard" className="w-full h-auto block" />
            </BrowserFrame>
            <BrowserFrame figNum="FIG. 02" caption="Invoice management with automated billing" url="susegad.co.in/invoices">
              <img src="/susegad-invoices.png" alt="Susegad Invoices" className="w-full h-auto block" />
            </BrowserFrame>
            <BrowserFrame figNum="FIG. 03" caption="Property listings with occupancy tracking" url="susegad.co.in/properties">
              <img src="/susegad-properties.png" alt="Susegad Properties" className="w-full h-auto block" />
            </BrowserFrame>
            <BrowserFrame figNum="FIG. 04" caption="Tenant directory with family details" url="susegad.co.in/tenants">
              <img src="/susegad-tenants.jpeg" alt="Susegad Tenants" className="w-full h-auto block" />
            </BrowserFrame>
            <BrowserFrame figNum="FIG. 05" caption="Unit management with tenant assignments and rent tracking" url="susegad.co.in/units">
            <img src="/susegad-units.png" alt="Susegad Units" className="w-full h-auto block" />
            </BrowserFrame>
          </div>

          <motion.div
            className="mt-20 flex items-center gap-5 p-5 bg-bone/5 backdrop-blur-md rounded-xl border border-bone/10 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ borderColor: 'rgba(62, 122, 112, 0.4)', backgroundColor: 'rgba(62, 122, 112, 0.05)' }}
          >
            <div className="w-12 h-12 bg-teal/20 backdrop-blur-md rounded-full flex items-center justify-center border border-teal/30 shrink-0">
              <Building2 className="w-6 h-6 text-teal" />
            </div>
            <div>
              <p className="font-display text-bone font-semibold text-lg">Enterprise SaaS Architecture</p>
              <p className="font-mono-editorial text-xs text-bone-dim tracking-wide mt-1">Scalable, secure, and automated.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DRAMATIC TRANSITION */}
      <section className="py-24 bg-ink relative overflow-hidden">
        <motion.div
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-brass/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <motion.div className="absolute bg-ink px-8 text-brass/70 font-mono-editorial text-xs tracking-[0.4em] uppercase" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          A Shift in Purpose
        </motion.div>
      </section>

      {/* NOORJEHAN - IVORY SPIRITUAL SECTION WITH APP SCREENSHOTS */}
      <section id="noorjehan" className="py-32 md:py-48 bg-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B4A5E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Phone Mockup with Screenshot Carousel */}
            <div className="md:col-span-5 md:order-1">
              <PhoneMockupCarousel />
            </div>

            {/* Content */}
            <div className="md:col-span-6 md:col-start-7 md:order-2">
              <motion.span className="font-mono-editorial text-xs tracking-[0.3em] text-plum uppercase mb-4 block" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                Project 02
              </motion.span>
              <motion.h3 className="font-display text-5xl md:text-7xl font-black tracking-tight text-plum mb-2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                NOORJEHAN
              </motion.h3>
              <motion.p className="font-arabic text-4xl md:text-5xl text-gold mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                نورجهان
              </motion.p>
              <motion.p className="font-mono-editorial text-xs tracking-[0.2em] text-plum/60 uppercase mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                Quran • Dua • Dhikr • Prayer
              </motion.p>

              <motion.div className="mb-8 p-6 bg-plum/8 rounded-xl border border-gold/30" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-4 h-4 text-gold" fill="currentColor" />
                  <p className="font-mono-editorial text-[10px] tracking-[0.2em] text-gold uppercase">Built as Sadaqah Jariyah</p>
                </div>
                <blockquote className="font-serif-editorial italic text-lg md:text-xl text-plum leading-relaxed mb-3">
                  "Noor of my life, my mother, my Jannah."
                </blockquote>
                <p className="text-sm text-plum/70 leading-relaxed">
                  This isn't just an app - it's a living tribute to my mother Noorjehan Bi. Every feature, every line of code, every moment of peace it brings to someone's day is dedicated to her eternal light.
                </p>
              </motion.div>

              <motion.p className="font-serif-editorial text-lg text-plum/80 leading-relaxed mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                A personal Islamic mobile application created in honor of my mother. A labor of love combining faith, technology, and daily remembrance.
              </motion.p>

              <motion.div className="grid grid-cols-2 gap-3 mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                {[
                  { icon: BookOpen, label: "Quran & Audio" },
                  { icon: BrainCircuit, label: "Dua & Dhikr" },
                  { icon: MapPin, label: "Qibla & Prayer" },
                  { icon: Smartphone, label: "Mobile First" }
                ].map((feature, i) => (
                  <motion.div key={i} className="flex items-center gap-2 text-plum/80 text-sm" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + (i * 0.08) }}>
                    <feature.icon className="w-4 h-4 text-gold" />
                    {feature.label}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="p-6 bg-plum/8 rounded-xl border border-plum/20 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
                <p className="font-mono-editorial text-[10px] tracking-[0.2em] text-gold uppercase mb-2">Coming Soon</p>
                <p className="font-display text-lg text-plum font-semibold mb-2">Noorjehan Academy</p>
                <ul className="space-y-1">
                  {['Quran Understanding', 'Tajweed', 'Hifz', 'Live Classes'].map((item, i) => (
                    <li key={i} className="font-serif-editorial text-sm text-plum/80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* VISIT NOORJEHAN BUTTON */}
              <motion.a
                href="http://noorjehan.susegad.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-plum bg-plum/10 px-7 py-4 hover:bg-plum hover:text-ivory transition-all uppercase rounded-md border border-plum/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, x: 2, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                VISIT NOORJEHAN
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const roles = [
    { year: "2026 – Present", title: "Program Lead", company: "iAssistInnovationLabs", desc: "Leading multiple enterprise AI products and cross-functional teams." },
    { year: "2023 – 2026", title: "AI Scientist", company: "iAssistInnovationLabs", desc: "Developed ML models and intelligent solutions for enterprise clients." },
    { year: "2022 – 2023", title: "Technician", company: "P.S. Enterprises", desc: "Hands-on technical execution and complex problem-solving." },
    { year: "2020 – 2021", title: "Technical Associate", company: "CommScope", desc: "Built foundation in technical operations and systems integration." },
  ];

  return (
    <section id="experience" ref={ref} className="py-32 md:py-48 bg-ink-2 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.h2 initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} className="font-display text-4xl md:text-6xl font-bold tracking-tight text-bone mb-20">
          The <span className="text-brass">Progression</span>
        </motion.h2>
        <div className="space-y-0">
          {roles.map((role, i) => (
            <motion.div
              key={role.year}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUpStagger}
              className="group relative py-10 md:py-14 border-b border-bone/10 hover:border-brass/30 transition-colors duration-500 cursor-default"
              whileHover={{ x: 20 }}
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                <div className="md:col-span-3">
                  <span className="font-mono-editorial text-sm text-brass tracking-widest">{role.year}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-bone group-hover:text-brass transition-colors duration-300">{role.title}</h3>
                  <p className="font-mono-editorial text-xs text-bone-dim mt-1">{role.company}</p>
                </div>
                <div className="md:col-span-5">
                  <p className="text-bone/60 text-lg font-light">{role.desc}</p>
                </div>
              </div>
              <motion.div className="absolute left-0 bottom-0 w-0 h-[1px] bg-brass" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 0.8, delay: i * 0.1 }} />
            </motion.div>
          ))}
        </div>
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} custom={4} variants={fadeUpStagger} className="mt-16 p-8 md:p-12 bg-ink rounded-2xl border border-bone/10 text-center" whileHover={{ scale: 1.02, borderColor: 'rgba(184,135,74,0.3)' }}>
          <p className="font-serif-editorial text-xl md:text-2xl text-bone/80 font-light">
            From <span className="text-brass font-medium">AI Scientist</span> to <span className="text-brass font-medium">Program Lead</span>.<br className="hidden md:block" />
            Currently managing <span className="text-bone font-semibold">5+ concurrent enterprise projects</span> and leading multiple enterprise insurance AI products.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const stats = [
    { value: "5+", label: "Concurrent Enterprise Projects" },
    { value: "30%", label: "Reduction in Manual Processing" },
    { value: "92%+", label: "ML Model Accuracy" },
    { value: "4", label: "AI Team Members Led" },
  ];

  return (
    <section ref={ref} className="py-32 bg-ink border-y border-bone/10 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-r from-brass/5 via-transparent to-plum/5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left"
              whileHover={{ y: -10 }}
            >
              <motion.div className="font-display text-5xl md:text-7xl font-black text-brass mb-3 tracking-tight" initial={{ opacity: 0, scale: 0.5 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}>
                {stat.value}
              </motion.div>
              <p className="font-mono-editorial text-xs text-bone-dim tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowIThink = () => {
  const ref = useRef(null);
  const principles = [
    "START WITH THE PROBLEM.",
    "BUILD FOR THE USER.",
    "SHIP WITH PURPOSE.",
    "MEASURE THE OUTCOME.",
    "MAKE COMPLEXITY FEEL SIMPLE."
  ];

  return (
    <section ref={ref} className="py-32 md:py-48 bg-ink-2 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-mono-editorial text-brass text-sm tracking-[0.3em] uppercase mb-16">
          Core Philosophy
        </motion.p>
        <div className="space-y-6 md:space-y-10">
          {principles.map((principle, i) => (
            <motion.div
              key={principle}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex items-baseline gap-6 md:gap-12 border-b border-bone/10 pb-6 md:pb-10 hover:border-brass/30 transition-colors duration-500 cursor-default ${i % 2 === 1 ? 'md:justify-end md:text-right' : ''}`}
              whileHover={{ x: i % 2 === 1 ? -20 : 20 }}
            >
              <span className="font-mono-editorial text-sm text-brass/30 group-hover:text-brass transition-colors">0{i + 1}</span>
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-bone/20 group-hover:text-bone transition-colors duration-500">
                {principle}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const studies = [
    {
      title: "AI-Powered Medical Report Summarization",
      type: "Fellowship Project",
      desc: "End-to-end product design from user research to high-fidelity prototyping for healthcare AI.",
      tags: ["User Research", "PRD", "Prototyping"],
      link: "https://assets.nextleap.app/submissions/AI-POWEREDMEDICALREPORT-4fb7d055-9778-41fb-a64b-47dfc52a5006.pdf"
    },
    {
      title: "Sukoon: Mental Wellness Case Study",
      type: "Graduation Project",
      desc: "Market mapping, user segmentation, and wireframing for a mental wellness application.",
      tags: ["Market Analysis", "Wireframing", "Success Metrics"],
      link: "https://assets.nextleap.app/submissions/NL_Sukoon-d55a7492-940e-4a64-82ed-4d75d5a2235c.pdf"
    },
    {
      title: "Swiggy Group Ordering Teardown",
      type: "Product Teardown",
      desc: "Heuristic evaluation and feature optimization analysis for a major food delivery platform.",
      tags: ["Product Teardown", "UX Analysis", "Strategy"],
      link: "https://nextleap.app/portfolio/ifzaan-shaikh"
    }
  ];

  return (
    <section ref={ref} className="py-32 md:py-48 bg-ink relative border-t border-bone/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-16"
        >
          <p className="font-mono-editorial text-brass text-sm tracking-[0.3em] uppercase mb-4">
            Product Thinking
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-bone">
            Case Studies <span className="text-bone/30">& Prototypes</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((study, i) => (
            <motion.a
              key={study.title}
              href={study.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 bg-ink-2 border border-bone/10 rounded-xl hover:border-brass/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono-editorial text-[10px] tracking-[0.15em] text-brass uppercase bg-brass/10 px-3 py-1 rounded-full">
                  {study.type}
                </span>
                <ArrowUpRight className="w-5 h-5 text-bone/30 group-hover:text-brass group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <h3 className="font-display text-xl font-bold text-bone mb-3 group-hover:text-brass transition-colors">
                {study.title}
              </h3>
              <p className="text-bone-dim text-sm leading-relaxed mb-6">
                {study.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="font-mono-editorial text-[10px] text-bone/50 border border-bone/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} className="py-32 md:py-48 bg-ink relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-gradient-to-t from-plum/10 via-brass/5 to-transparent pointer-events-none" animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp}>
          <motion.h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tightest text-bone leading-[0.9] mb-12" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            LET'S BUILD<br />
            <motion.span className="animate-gradient-text" initial={{ backgroundPosition: "200% 0%" }} whileInView={{ backgroundPosition: "0% 0%" }} transition={{ duration: 2, delay: 0.5 }}>
              SOMETHING
            </motion.span><br />
            USEFUL.
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} custom={1} variants={fadeUpStagger} className="space-y-8 mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-bone">IFZAAN SHAIKH</h3>
          <div className="flex flex-wrap justify-center gap-4 font-mono-editorial text-xs text-bone-dim tracking-widest uppercase">
            <span>Program Lead</span>
            <span className="text-brass">•</span>
            <span>AI Product Manager</span>
            <span className="text-brass">•</span>
            <span>Product Builder</span>
          </div>
        </motion.div>

        {/* CONTACT INFO ROW (Email, Phone, Location) */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} custom={2} variants={fadeUpStagger} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-16">
          <motion.a href="mailto:ifzaanshaikh29@gmail.com" className="group flex items-center gap-3 text-bone/70 hover:text-brass transition-colors text-lg" whileHover={{ x: 10 }}>
            <Mail className="w-5 h-5" />
            ifzaanshaikh29@gmail.com
          </motion.a>
          <div className="hidden md:block w-1 h-1 bg-bone/20 rounded-full" />
          
          {/* NEW: CLICKABLE PHONE NUMBER */}
          <motion.a href="tel:+919876543210" className="group flex items-center gap-3 text-bone/70 hover:text-brass transition-colors text-lg" whileHover={{ x: 10 }}>
            <Phone className="w-5 h-5" />
            +91 8600969587 {/*  YOUR ACTUAL NUMBER */}
          </motion.a>
          
          <div className="hidden md:block w-1 h-1 bg-bone/20 rounded-full" />
          <motion.div className="flex items-center gap-3 text-bone/70 text-lg">
            <MapPin className="w-5 h-5 text-brass" />
            Goa, India
          </motion.div>
        </motion.div>

        {/* ACTION BUTTONS (Email, Call, LinkedIn) */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} custom={3} variants={fadeUpStagger} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <motion.a href="mailto:ifzaanshaikh29@gmail.com" className="inline-flex items-center justify-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-ink bg-brass px-8 py-5 hover:bg-brass/90 transition-colors uppercase" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Mail className="w-5 h-5" />
            SEND AN EMAIL
          </motion.a>
          
          {/* NEW: CALL ME BUTTON */}
          <motion.a href="tel:+918600969587" className="inline-flex items-center justify-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-bone border border-bone/20 px-8 py-5 hover:bg-bone/5 hover:border-brass/50 transition-all uppercase" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Phone className="w-5 h-5" />
            CALL ME
          </motion.a>

          <motion.a href="https://linkedin.com/in/ifzaanshaikh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 font-mono-editorial text-sm tracking-[0.1em] text-bone border border-bone/20 px-8 py-5 hover:bg-bone/5 hover:border-brass/50 transition-all uppercase" whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            <Linkedin className="w-5 h-5" />
            LINKEDIN
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 bg-ink border-t border-bone/10">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="font-mono-editorial text-bone/30 text-xs tracking-widest uppercase">© 2026 Ifzaan Shaikh.</p>
      <p className="font-mono-editorial text-bone/20 text-xs tracking-widest uppercase">Built with precision & purpose.</p>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-ink selection:bg-brass selection:text-ink overflow-x-hidden">
      <Head>
        <title>Ifzaan Shaikh | AI Product Leader & Product Builder</title>
        <meta name="description" content="Program Lead & AI Product Manager. I don't just manage products. I build them." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <CustomCursor />
      <GrainOverlay />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Products />
        <Experience />
        <Impact />
        <HowIThink />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}