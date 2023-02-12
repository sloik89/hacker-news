import React, { useState, useEffect, useContext, useReducer } from "react";
import { SET_LOADING, SET_STORIES, SET_REMOVE } from "./actions";
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
  useEffect(() => {
    fetchStories(`${url}query=${state.query}`);
  }, []);
  return (
    <AppContext.Provider value={{ ...state, handleRemoveItem }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
