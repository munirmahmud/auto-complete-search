import axios from "axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { IoClose, IoSearch } from "react-icons/io5";
import { MoonLoader } from "react-spinners";
import { useDebounce } from "../../hooks/debounceHook";
import TvShow from "../TvShow";
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
    height: "30rem",
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
  const [isLoading, setLoading] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);

  const isEmpty = !tvShows || tvShows.length === 0;

  // const changeHandler = (e) => {
  //   e.preventDefault()
  //   setSearchQuery(e.target.value);
  // };

  const expandContainer = () => {
    setIsExpanded(true);
  };

  const collapseContainer = () => {
    setIsExpanded(false);
    setLoading(false);
    setSearchQuery("");
    setTvShows([]);

    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;

    return encodeURI(url);
  };

  const searchTVShows = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error", err);
    });

    console.log(response);

    if (response) {
      setTvShows(response.data);
      console.log("Respnose", response.data);
    }
    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchTVShows);

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

      {isExpanded && <LineSeperator />}

      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading size={25} />
            </LoadingWrapper>
          )}

          {!isLoading && !isEmpty && (
            <>
              {tvShows.map(({ show }, index) => (
                <TvShow
                  key={index}
                  thumbnailSrc={show?.image?.medium}
                  name={show?.name}
                  rating={show?.rating?.average}
                />
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
