import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import type { ChangeEvent } from "react";
import { searchContext } from "../context/search";

const Header = () => {
  const { setSearchText } = useContext(searchContext);

  const [debounceTimeOut, setDebounceTimeOut] = useState<
    string | NodeJS.Timeout
  >("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    clearTimeout(debounceTimeOut);
    const debounceTimeOutId = setTimeout(() => {
      setSearchText(text);
    }, 1000);

    setDebounceTimeOut(debounceTimeOutId);
  };
  return (
    <header className="flex min-h-header gap-4 pt-8 font-sans text-md">
      <Link href={"/"} className="w-32">
        <div className="relative h-full w-full">
          <Image
            src="my_unsplash_logo.svg"
            alt="my unsplash log"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="flex gap-3 rounded-xl border pl-3">
        {/* Todo: Make the icon live inside input */}
        <Image src="search.svg" alt="search" width={18} height={18} />
        <input
          type="text"
          className="bg-transparent"
          placeholder="Search by name"
          onChange={handleSearch}
        />
      </div>
      <div className=" ml-auto w-[137px]">
        <button className=" h-full w-full rounded-xl bg-primary-500 p-3 font-bold text-neutral-100">
          Add a photo
        </button>
      </div>
    </header>
  );
};

export default Header;
