import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

import portfolio1 from "@/assets/portfolio-1.webp";
import portfolio2 from "@/assets/portfolio-2.webp";
import portfolio3 from "@/assets/portfolio-3.webp";
import portfolio4 from "@/assets/portfolio-4.webp";
import portfolio5 from "@/assets/portfolio-5.webp";
import portfolio6 from "@/assets/portfolio-6.webp";
import portfolio7 from "@/assets/portfolio-7.webp";
import portfolio8 from "@/assets/portfolio-8.webp";
import portfolio9 from "@/assets/portfolio-9.webp";
import portfolio10 from "@/assets/portfolio-10.webp";
import portfolio11 from "@/assets/portfolio-11.webp";
import portfolio12 from "@/assets/portfolio-12.webp";
import portfolio13 from "@/assets/portfolio-13.webp";
import portfolio14 from "@/assets/portfolio-14.webp";
import portfolio15 from "@/assets/portfolio-15.webp";
import portfolio16 from "@/assets/portfolio-16.webp";

const collages = [
  { title: "Портретная серия", photos: [portfolio1, portfolio2, portfolio3, portfolio4] },
  { title: "Лавстори & Пары", photos: [portfolio5, portfolio6, portfolio7, portfolio8] },
  { title: "Семейные моменты", photos: [portfolio9, portfolio10, portfolio11, portfolio12] },
  { title: "Бизнес фотосессия", photos: [portfolio13, portfolio14, portfolio15, portfolio16] },
];

const VK_URL = "https://vk.com/dokerphoto";
const TG_URL = "https://t.me/whats8979";
const WA_URL = "https://wa.me/79935844456";

const VkIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.677-1.253.677-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.743c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z"/>
  </svg>
);

const TgIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const CollageCard = ({ collage, index }: { collage: (typeof collages)[0]; index: number }) => (
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
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-lg
        opacity-100 md:opacity-0 md:group-hover:opacity-100
        transition-opacity duration-500 flex items-end p-6">
        <p className="font-display text-2xl text-foreground">{collage.title}</p>
      </div>
    </div>
  </motion.div>
);

const Works = () => {
  // Переходим на главную с якорем — используем location.origin чтобы всегда был правильный домен
  const goToBooking = () => {
    window.location.href = window.location.origin + "/#booking";
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar onBookClick={goToBooking} />

      <div className="pt-32 pb-24 md:pb-40">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24"
          >
            <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">Портфолио</p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground font-medium">Мои работы</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collages.map((collage, i) => (
              <CollageCard key={i} collage={collage} index={i} />
            ))}
          </div>

          {/* Кнопка портфолио */}
          <div className="flex justify-center mt-10 mb-16 md:mb-24">
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-body text-muted-foreground mb-6">
              Понравились работы? Напишите мне — обсудим вашу съёмку
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={VK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0077FF] text-white px-6 py-3 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <VkIcon />
                Написать ВКонтакте
              </a>
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-body font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <TgIcon />
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>

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
