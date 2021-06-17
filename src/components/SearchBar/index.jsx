import React from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  CloseIcon,
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from "./searchbar.styles";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput placeholder="Search for TV shows..." />
        <CloseIcon>
          <IoClose />
        </CloseIcon>
      </SearchInputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;
