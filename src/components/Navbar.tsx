import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const handleBookClick = () => {
    setMenuOpen(false);
    onBookClick();
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-background/90 backdrop-blur-md border-b border-border"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="font-display text-xl text-foreground relative z-50">
            DokerPhoto
          </a>

          {/* Десктоп */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/works" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              Работы
            </a>
            <a href="https://dokersale.ru/#booking" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              Бронирование
            </a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBookClick}
              className="font-body text-sm bg-accent text-accent-foreground px-5 py-2 rounded-full font-medium"
            >
              Обсудить концепцию
            </motion.button>
          </div>

          {/* Бургер */}
          <button
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            aria-label="Меню"
          >
            <span className={`block h-px w-6 bg-foreground transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-30 pt-20 pb-8 px-6 bg-background/95 backdrop-blur-md border-b border-border md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              <a href="/works" onClick={() => setMenuOpen(false)} className="font-body text-lg text-muted-foreground hover:text-foreground transition-colors">
                Работы
              </a>
              <a href="https://dokersale.ru/#booking" onClick={() => setMenuOpen(false)} className="font-body text-lg text-muted-foreground hover:text-foreground transition-colors">
                Бронирование
              </a>
              <a href="https://vk.com/dokerphoto" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="font-body text-lg text-muted-foreground hover:text-foreground transition-colors">
                ВКонтакте
              </a>
              <button
                onClick={handleBookClick}
                className="font-body text-base bg-accent text-accent-foreground px-6 py-3 rounded-full font-medium w-full text-center mt-2"
              >
                Обсудить концепцию
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
