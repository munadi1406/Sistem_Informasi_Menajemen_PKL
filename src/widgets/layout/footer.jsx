
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2 w-full">
    <div className="text-center">
      &copy; {year} <span className="font-bold">SMAN 1 Karang Intan </span>Develop By <a href="google.com" className="font-bold">Mun</a>
    </div>
    </footer>
  );
}

export default Footer;
