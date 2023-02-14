import { createContext, useState } from "react";
import type { FC, ReactElement, Dispatch, SetStateAction } from "react";

type SearchContextType = {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType>({
  searchText: "",
  setSearchText: () => ({}),
});

export const SearchProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState("");
  const value = { searchText, setSearchText };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
