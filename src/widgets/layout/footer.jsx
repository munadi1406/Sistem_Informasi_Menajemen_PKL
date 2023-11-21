
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2 w-full">
    <div className="text-center text-xs">
      &copy; {year} <span className="font-bold">SMAN 1 Karang Intan </span>Develop By <a href="mailto:munadifathullah123@gmail.com" className="font-bold" target={"_blank"} rel={"noreferrer"}>Mun</a>
    </div>
    </footer>
  );
}

export default Footer;
