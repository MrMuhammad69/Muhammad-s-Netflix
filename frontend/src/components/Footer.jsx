const Footer = () => {
  return (
    <footer className="py-10 md:py-1 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row text-center">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a href="https://github.com/MrMuhammad69/Muhammad-s-Netflix" className="font-medium underline underline-offset-4">
            Muhammad Bin Abdul Latif
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
