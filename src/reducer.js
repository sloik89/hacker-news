import { SET_LOADING, SET_STORIES } from "./actions";
const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === SET_STORIES) {
    const { hits, nbPages } = action.payload;
    console.log(hits, nbPages);
    return { ...state, hits, nbPages, loading: false };
  }
  return state;
};
export default reducer;
