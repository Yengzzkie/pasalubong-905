"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSearchQuery } from "@/stores/store";
import Button from '@mui/material/Button';

const SearchBar = ({ fetchPostsByQuery }) => {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <>
        <div className="flex items-center gap-2 border-y-[1px] border-zinc-300 w-full px-4">
        <div className="relative flex bg-[#f0f1f1] w-full px-4 rounded-sm my-4">
          <MagnifyingGlassIcon className="w-6 bg-[var(--primary-light)] pl-2" />
          <input
            type="text"
            className="w-full py-2 px-2 bg-[var(--primary-light)] outline-none"
            placeholder="What are you looking for?"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchPostsByQuery();
              }
            }}
          />
          <XMarkIcon
            className={`${
              searchQuery === "" ? "invisible" : "block"
            } absolute w-5 right-1 top-1/2 -translate-y-1/2 cursor-pointer`}
            onClick={() => setSearchQuery("")}
          />
        </div>
        <Button onClick={() => fetchPostsByQuery()} variant="contained" sx={{ bgcolor: "var(--color-primary)", color: "var(--color-primary-content)" }}>Search</Button>
      </div>
    </>
  );
};

export default SearchBar;
