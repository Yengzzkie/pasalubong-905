import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full flex flex-wrap items-center justify-center font-light text-nowrap text-sm p-4 border-t-[1px]">
      <a
        className="flex flex-col items-center gap-2 hover:underline hover:underline-offset-4 font-display"
        href="https://www.linkedin.com/in/manuel-gatchalian/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          <p>NadaMart {new Date().getFullYear()} - All Rights Reserved</p>
        </div>
        <p>Developed by <strong>Manuel Gatchalian</strong></p>
      </a>
    </footer>
  );
};

export default Footer;
