import { motion, AnimatePresence } from "framer-motion";
import { useState, forwardRef } from "react";
import { toast } from "@/hooks/use-toast";

interface AddOn {
  id: string;
  title: string;
  price: number;
  description: string;
}

const addOns: AddOn[] = [
  {
    id: "assistant",
    title: "Ассистент по свету",
    price: 5000,
    description: "Для сложных локаций и журнального эффекта",
  },
  {
    id: "print",
    title: "Печать в рамах",
    price: 8000,
    description: "3 отпечатка 30×40 в деревянных рамах",
  },
];

const PRICE_PER_HOUR = 3000;
const FIRST_TIME_PRICE_PER_HOUR = 2000;
const FIRST_TIME_DISCOUNT = 1000; // per hour

const BookingSection = forwardRef<HTMLElement>((_, ref) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hours, setHours] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const basePrice = PRICE_PER_HOUR * hours;
  const discountedBase = FIRST_TIME_PRICE_PER_HOUR * hours;
  const addOnsTotal = addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalPrice = (isFirstTime ? discountedBase : basePrice) + addOnsTotal;
  const priceBeforeDiscount = basePrice + addOnsTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Заполните все поля", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    const selectedAddOnTitles = addOns
      .filter((a) => selectedAddOns.includes(a.id))
      .map((a) => a.title);

    try {
      const res = await fetch(
        (import.meta.env.VITE_BOT_WEBHOOK_URL as string) || "/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            hours,
            isFirstTime,
            addOns: selectedAddOnTitles,
            totalPrice,
          }),
        }
      );

      if (!res.ok) throw new Error("Network error");

      setName("");
      setPhone("");
      setSelectedAddOns([]);
      setHours(1);
      setIsFirstTime(false);
      toast({ title: "Заявка отправлена!", description: "Я свяжусь с вами в ближайшее время." });
    } catch {
      toast({ title: "Ошибка отправки", description: "Проверьте интернет или попробуйте позже.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="booking" className="py-12 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">Бронирование</p>
            <h2 className="font-display text-4xl md:text-6xl text-foreground font-medium mb-6">
              Обсудим<br />концепцию
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-md mb-8">
              Оставьте заявку — я перезвоню в течение часа, чтобы обсудить детали и подобрать дату.
            </p>
            <div className="glass-surface rounded-lg p-4 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-sm text-muted-foreground">
                Ближайшее окно: <span className="text-foreground tabular-nums">Суббота, 14:00</span>
              </span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="glass-surface rounded-3xl p-8 md:p-10 space-y-6">
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Александра"
                />
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">Телефон</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={20}
                  className="w-full bg-transparent border-b border-border py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors tabular-nums"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              {/* Hours slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="font-body text-sm text-muted-foreground">Количество часов</label>
                  <span className="font-body text-sm text-foreground font-medium tabular-nums">
                    {hours} {hours === 1 ? "час" : hours < 5 ? "часа" : "часов"}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full h-1 appearance-none cursor-pointer rounded-full outline-none
                      [&::-webkit-slider-runnable-track]:rounded-full
                      [&::-webkit-slider-runnable-track]:h-1
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-5
                      [&::-webkit-slider-thumb]:h-5
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-accent
                      [&::-webkit-slider-thumb]:border-2
                      [&::-webkit-slider-thumb]:border-background
                      [&::-webkit-slider-thumb]:shadow-md
                      [&::-webkit-slider-thumb]:-mt-2
                      [&::-moz-range-thumb]:w-5
                      [&::-moz-range-thumb]:h-5
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-accent
                      [&::-moz-range-thumb]:border-2
                      [&::-moz-range-thumb]:border-background
                      [&::-moz-range-thumb]:shadow-md"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent)) ${(hours - 1) / 4 * 100}%, hsl(var(--border)) ${(hours - 1) / 4 * 100}%, hsl(var(--border)) 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    {[1, 2, 3, 4, 5].map((h) => (
                      <span key={h} className={`font-body text-xs tabular-nums transition-colors ${h === hours ? "text-accent" : "text-muted-foreground/40"}`}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* First time discount */}
              <motion.button
                type="button"
                onClick={() => setIsFirstTime((v) => !v)}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  isFirstTime
                    ? "border-accent/40 bg-accent/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-body text-sm text-foreground font-medium">Первый раз у меня</span>
                      <AnimatePresence>
                        {isFirstTime && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="font-body text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium"
                          >
                            −{(FIRST_TIME_DISCOUNT * hours).toLocaleString("ru-RU")} ₽
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">
                      Скидка 1 000 ₽/час — {FIRST_TIME_PRICE_PER_HOUR.toLocaleString("ru-RU")} ₽ вместо {PRICE_PER_HOUR.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    isFirstTime ? "border-accent bg-accent" : "border-muted-foreground/40"
                  }`}>
                    {isFirstTime && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 text-accent-foreground"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    )}
                  </div>
                </div>
              </motion.button>

              {/* Add-ons */}
              <div className="pt-2">
                <p className="font-body text-sm text-muted-foreground mb-4">Дополнительные услуги</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addOns.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id);
                    return (
                      <motion.button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon.id)}
                        whileTap={{ scale: 0.97 }}
                        className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                          isSelected
                            ? "border-accent/40 bg-accent/5"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-body text-sm text-foreground font-medium">{addon.title}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected ? "border-accent bg-accent" : "border-muted-foreground/40"
                          }`}>
                            {isSelected && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 text-accent-foreground"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            )}
                          </div>
                        </div>
                        <p className="font-body text-xs text-muted-foreground">{addon.description}</p>
                        <p className="font-body text-sm text-foreground/70 mt-2 tabular-nums">
                          +{addon.price.toLocaleString("ru-RU")} ₽
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-1">Итого</p>
                  <div className="flex items-baseline gap-3">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={totalPrice}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="font-display text-3xl text-foreground tabular-nums"
                      >
                        {totalPrice.toLocaleString("ru-RU")} ₽
                      </motion.p>
                    </AnimatePresence>

                    <AnimatePresence>
                      {isFirstTime && (
                        <motion.p
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.25 }}
                          className="font-display text-2xl text-muted-foreground/60 tabular-nums decoration-muted-foreground/60 decoration-2 line-through"
                        >
                          {priceBeforeDiscount.toLocaleString("ru-RU")} ₽
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-accent text-accent-foreground px-8 py-4 font-body font-medium rounded-full text-base disabled:opacity-50 transition-opacity"
                >
                  {isSubmitting ? "Отправляю..." : "Забронировать дату"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

BookingSection.displayName = "BookingSection";

export default BookingSection;
