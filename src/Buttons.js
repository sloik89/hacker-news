import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { loading, page, nbPages, handlePage } = useGlobalContext();
  return (
    <div className="btns-container">
      <button className="btn prev" onClick={() => handlePage("prev")}>
        Prev
      </button>
      <p className="text-info">
        {page + 1} of {nbPages}
      </p>
      <button className="btn next" onClick={() => handlePage("next")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
