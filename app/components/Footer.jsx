
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconBrandTiktokFilled } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="relative flex flex-wrap items-start justify-center font-light text-nowrap text-sm border-t w-full">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center w-full mx-12 lg:mx-24 gap-8 px-4 py-10 lg:py-20">
        <div className="flex-1 flex flex-col gap-2 text-zinc-600 p-4 min-w-[200px]">
          <h1 className="text-xl font-bold mb-2">Contact Us</h1>
          <p><span className="font-semibold text-wrap">Address:</span> 210 Bond St W Unit A, Oshawa, ON L1J 2L7</p>
          <p><span className="font-semibold">Email:</span> pasalubong905@gmail.com</p>
          <p><span className="font-semibold">Phone:</span> (905) 720-0800</p>
        </div>

        <div className="flex-1 flex flex-col gap-2 text-zinc-600 p-4 min-w-[200px]">
          <h1 className="text-xl font-bold mb-2">Open Hours</h1>
          <p className="text-sm text-wrap">We are open all week to serve you! See below for our hours:</p>
          <p className='font-[400]'>Monday–Friday: <span className="font-bold">10:30 AM – 8 PM</span></p>
          <p className='font-[400]'>Saturday: <span className="font-bold">9 AM – 9 PM</span></p>
          <p className='font-[400]'>Sunday: <span className="font-bold">9 AM – 8 PM</span></p>
        </div>

        <div className="flex-1 flex flex-col gap-2 text-zinc-600 p-4 min-w-[200px]">
          <h1 className="text-xl font-bold mb-2">Map</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2875.014881996394!2d-78.8718579!3d43.8969585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51d72053c64b9%3A0x471c5c2b766bc95c!2sPasalubong%20905!5e0!3m2!1sen!2sca!4v1738977443160!5m2!1sen!2sca"
            width="auto" height="auto" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 text-zinc-600 p-4 min-w-[200px]">
          <h1 className="text-xl font-bold mb-2">Follow Us</h1>
          <p className='font-[400]'><a href="https://www.facebook.com/profile.php?id=100088693986963" target="_blank" rel="noopener noreferrer"><FacebookIcon /> Facebook</a></p>
          <p className='font-[400]'><a href="https://www.instagram.com/pasalubong.905" target="_blank" rel="noopener noreferrer"><InstagramIcon /> Instagram</a></p>
          <p className='font-[400]'><a href="https://www.tiktok.com/@pasalubong905_" target="_blank" rel="noopener noreferrer"><IconBrandTiktokFilled className='inline-block mr-1' />TikTok</a></p>
        </div>
      </div>

      <div className='bg-[#B6D4FE] w-full py-4 flex justify-center items-center gap-2 text-zinc-800'>
        <a
        className="flex flex-col items-center gap-2 hover:underline hover:underline-offset-4 font-display"
        href="https://www.linkedin.com/in/manuel-gatchalian/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className='font-[400]'>&copy; {new Date().getFullYear()} Pasalubong905 | Made With <FavoriteIcon className='inline-block' /> by <strong className='font-bold'>Manuel Gatchalian</strong></p>
      </a>
      </div>
    </footer>
  );
};

export default Footer;
