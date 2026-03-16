const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-2xl text-foreground mb-2">DokerPhoto</p>
            <p className="font-body text-sm text-muted-foreground">
              Частная фотосъёмка премиум-класса
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://vk.com/dokerphoto"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ВКонтакте
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://t.me/whats8979"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Telegram
            </a>
            <a
              href="mailto:hello@thelastframe.ru"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="font-body text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} DokerPhoto. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
