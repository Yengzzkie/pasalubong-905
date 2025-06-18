"use client";
import { useMemo } from "react";
  import { useSession } from "next-auth/react";

const GoogleMap = ({ location }) => {
  const session = useSession();

  const query = useMemo(() => {
    const { city = "", province = "", country = "", postal_code = "" } = location || {};
    return encodeURIComponent(`${city}, ${province}, ${postal_code}, ${country}`);
  }, [location]);

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBZs6sZ3lFvNP5ogJPE8D3eOICTnBjaDZI&q=${query}`;

  return (
    <div className="relative z-0">
      <h1 className="font-bold text-[var(--color-base-content)] text-lg lg:text-xl mt-4 mb-2">
        Map preview
      </h1>
      <iframe
        key={mapSrc}
        className={`w-full h-[25vh] lg:h-[400px] ${session?.status !== "authenticated" && "pointer-events-none"}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      />
      
      {/* Blurred overlay */}
      {session?.status !== "authenticated" && (
        <div className="absolute flex items-center justify-center font-bold inset-0 bg-white/30 backdrop-blur-md z-50 pointer-events-none" >
          <a className="text-blue-600 hover:underline mr-1" href="/login">Log in</a> to view the map
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
