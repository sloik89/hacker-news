import React, { useState, useEffect, useContext, useReducer } from "react";
import {
  SET_LOADING,
  SET_STORIES,
  SET_REMOVE,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from "./actions";
import reducer from "./reducer";
const url = "http://hn.algolia.com/api/v1/search?";
const AppContext = React.createContext();
const initalState = {
  loading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveItem = (id) => {
    dispatch({ type: SET_REMOVE, payload: id });
  };
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };
  useEffect(() => {
    fetchStories(`${url}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  return (
    <AppContext.Provider
      value={{ ...state, handleRemoveItem, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
