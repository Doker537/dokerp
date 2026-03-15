import { motion } from "framer-motion";

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 py-5 px-6 md:px-12"
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="font-display text-xl text-foreground">
          DokerPhoto
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="/works" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Работы
          </a>
          <a href="#booking" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Бронирование
          </a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookClick}
            className="font-body text-sm bg-accent text-accent-foreground px-5 py-2 rounded-full font-medium"
          >
            Обсудить концепцию
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
