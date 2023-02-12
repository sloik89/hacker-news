import {
  SET_LOADING,
  SET_STORIES,
  SET_REMOVE,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from "./actions";
const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === SET_STORIES) {
    const { hits, nbPages } = action.payload;
    console.log(hits, nbPages);
    return { ...state, hits, nbPages, loading: false };
  }
  if (action.type === SET_REMOVE) {
    const { payload: id } = action;
    console.log(id);
    const newItems = state.hits.filter((item) => item.objectID !== id);
    console.log(newItems);
    return { ...state, hits: newItems };
  }
  if (action.type === HANDLE_SEARCH) {
    return { ...state, query: action.payload };
  }
  if (action.type === HANDLE_PAGE) {
    if (action.payload === "prev") {
      let prevPage = state.page - 1;
      if (prevPage < 0) {
        prevPage = state.nbPages - 1;
      }
      return { ...state, page: prevPage };
      console.log("page");
    } else if (action.payload === "next") {
      let nextPage = state.page + 1;
      if (nextPage >= state.nbPages) {
        nextPage = 0;
      }
      return { ...state, page: nextPage };
      console.log("page");
    }
  }
  return state;
};
export default reducer;
