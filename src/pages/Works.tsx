import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

const collages = [
  {
    title: "Портретная серия",
    photos: [portfolio1, portfolio2, portfolio3, portfolio4],
  },
  {
    title: "Лавстори & Пары",
    photos: [portfolio2, portfolio5, portfolio1, portfolio3],
  },
  {
    title: "Арт & Фэшн",
    photos: [portfolio4, portfolio3, portfolio5, portfolio2],
  },
  {
    title: "Семейные моменты",
    photos: [portfolio5, portfolio1, portfolio4, portfolio3],
  },
];

const CollageCard = ({
  collage,
  index,
}: {
  collage: (typeof collages)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="group relative">
      <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-square rounded-lg overflow-hidden">
        {collage.photos.map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <img
              src={src}
              alt={`${collage.title} — кадр ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <p className="font-display text-2xl text-foreground">{collage.title}</p>
      </div>
    </div>
  </motion.div>
);

const Works = () => {
  return (
    <main className="bg-background min-h-screen">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 py-5 px-6 md:px-12"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-display text-xl text-foreground">
            DokerPhoto
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/works"
              className="font-body text-sm text-foreground transition-colors"
            >
              Работы
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="pt-32 pb-24 md:pb-40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24"
          >
            <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
              Портфолио
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground font-medium">
              Мои работы
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collages.map((collage, i) => (
              <CollageCard key={i} collage={collage} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-24 text-center"
          >
            <p className="font-body text-muted-foreground mb-6">
              Понравились работы? Напишите мне — обсудим вашу съёмку
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/79991234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Написать в WhatsApp
              </a>
              <a
                href="https://t.me/photographer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <p className="font-display text-lg text-foreground">DokerPhoto</p>
          <p className="font-body text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} DokerPhoto
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Works;
