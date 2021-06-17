import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { IoClose, IoSearch } from "react-icons/io5";
import {
  CloseIcon,
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  SearchInputContainer,
} from "./searchbar.styles";

const containerVariants = {
  expanded: {
    height: "20rem",
  },
  collapsed: {
    height: "3.9rem",
  },
};

const containerTransition = {
  type: "spring",
  damping: 22,
  stiffness: 150,
};

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const collapseContainer = () => {
    setIsExpanded(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  return (
    <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder="Search for TV shows..."
          onFocus={expandContainer}
          ref={inputRef}
        />
        <CloseIcon onClick={collapseContainer}>
          <IoClose />
        </CloseIcon>
      </SearchInputContainer>
    </SearchBarContainer>
  );
};

export default SearchBar;