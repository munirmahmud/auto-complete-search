import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { IoClose, IoSearch } from "react-icons/io5";
import { MoonLoader } from "react-spinners";
import {
  CloseIcon,
  LineSeperator,
  LoadingWrapper,
  SearchBarContainer,
  SearchContent,
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
  const [searchQuery, setSearchQuery] = useState("");

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const collapseContainer = () => {
    setIsExpanded(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSearchQuery("");
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const searchTVShows = () => {};

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={collapseContainer}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      <LineSeperator />
      <SearchContent>
        Love the idea
        <LoadingWrapper>
          <MoonLoader loading size={25} />
        </LoadingWrapper>
      </SearchContent>
    </SearchBarContainer>
  );
};

export default SearchBar;
