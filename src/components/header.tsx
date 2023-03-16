import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import type { ChangeEvent } from "react";
import { SearchContext } from "../context/searchContext";
import { ModalContext } from "../context/modalContext";
import SearchSvg from "./svg/SearchSvg";

const Header = () => {
  const { setSearchText } = useContext(SearchContext);
  const { toggleModalView, modalView, setType } = useContext(ModalContext);

  const [debounceTimeOut, setDebounceTimeOut] = useState<
    string | NodeJS.Timeout
  >("");

  const handleModal = () => {
    setType("add");
    toggleModalView(!modalView);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    clearTimeout(debounceTimeOut);
    const debounceTimeOutId = setTimeout(() => {
      setSearchText(text);
    }, 500);
    setDebounceTimeOut(debounceTimeOutId);
  };
  return (
    <header className="mt-8 flex h-header justify-center gap-4 font-sans text-md">
      <Link href={"/"} className="w-0 sm:w-32">
        <div className="relative h-full w-full">
          <Image
            src="my_unsplash_logo.svg"
            alt="my unsplash log"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>
      <div className="relative flex gap-3 rounded-xl border">
        <div className="absolute top-1/4 left-2">
          <SearchSvg />
        </div>
        <input
          type="text"
          className="rounded-xl bg-transparent pl-10"
          placeholder="Search by name"
          onChange={handleSearch}
        />
      </div>
      <div className=" ml-auto w-[137px]">
        <button
          onClick={handleModal}
          className=" h-full w-full rounded-xl bg-primary-500 px-3 font-bold text-neutral-100 md:p-3"
        >
          Add a photo
        </button>
      </div>
    </header>
  );
};

export default Header;
