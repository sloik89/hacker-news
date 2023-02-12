import { SET_LOADING, SET_STORIES, SET_REMOVE, HANDLE_SEARCH } from "./actions";
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
    console.log("jestem");
    return { ...state, query: action.payload };
  }
  return state;
};
export default reducer;
