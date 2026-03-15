import { motion } from "framer-motion";
import heroPhoto from "@/assets/hero-photo.jpg";

const HeroSection = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 md:pb-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroPhoto}
          alt="Фотограф за работой в студии"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-[0.95] mb-6">
            Снимаю не&nbsp;то, как&nbsp;вы&nbsp;выглядите, а&nbsp;то, кем&nbsp;вы&nbsp;являетесь.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-muted-foreground text-lg md:text-xl max-w-xl mb-10"
          >
            Частные фотосессии для тех, кто ценит историю в каждом кадре.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="bg-accent text-accent-foreground px-8 py-4 font-body font-medium rounded-full text-base"
            >
              Забронировать дату
            </motion.button>

            <a
              href="/works"
              className="font-body text-foreground/70 hover:text-foreground transition-colors px-4 py-4 text-base"
            >
              Смотреть работы →
            </a>
          </motion.div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-sm text-muted-foreground tabular-nums">
              4 места на апрель уже заняты. Осталось 2.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
