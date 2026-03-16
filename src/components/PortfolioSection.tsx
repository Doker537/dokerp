import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

const photos = [
  { src: portfolio1, title: "Портрет у окна", category: "Портрет", aspect: "3/2" },
  { src: portfolio2, title: "История двоих", category: "Лавстори", aspect: "1/1" },
  { src: portfolio3, title: "Семейный момент", category: "Семейная", aspect: "3/2" },
  { src: portfolio4, title: "Тени и линии", category: "Фэшн", aspect: "2/3" },
  { src: portfolio5, title: "Призма", category: "Арт", aspect: "1/1" },
];

const PortfolioItem = ({
  photo,
  index,
  onBookClick,
}: {
  photo: (typeof photos)[0];
  index: number;
  onBookClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className="mb-24 md:mb-40">
      <div
        className={`relative overflow-hidden rounded-lg ${
          index % 2 === 0 ? "md:ml-0 md:mr-[15%]" : "md:ml-[15%] md:mr-0"
        }`}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="w-full object-cover transition-all duration-700 md:hover:scale-[1.03]"
          style={{ aspectRatio: photo.aspect }}
          loading="lazy"
        />

        {/* Оверлей: на мобильном всегда виден, на десктопе — hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent
          opacity-100 md:opacity-0 md:hover:opacity-100
          transition-opacity duration-500 flex items-end p-6 md:p-8">
          <div className="flex items-end justify-between w-full">
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">
                {photo.category}
              </p>
              <p className="font-display text-2xl text-foreground">{photo.title}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookClick}
              className="bg-accent text-accent-foreground px-5 py-2.5 font-body text-sm font-medium rounded-full"
            >
              Хочу так же
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioSection = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section id="portfolio" className="py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-32"
        >
          <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">Портфолио</p>
          <h2 className="font-display text-4xl md:text-6xl text-foreground font-medium">
            Каждый кадр —<br />отдельная история
          </h2>
        </motion.div>

        {photos.map((photo, i) => (
          <PortfolioItem key={i} photo={photo} index={i} onBookClick={onBookClick} />
        ))}

        {/* Кнопка портфолио */}
        <div className="flex justify-center mt-4 pb-8">
          <a
            href="https://dokerphoto.ru/moi-raboty"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-body font-medium text-base hover:border-muted-foreground transition-colors"
          >
            Портфолио полностью
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
