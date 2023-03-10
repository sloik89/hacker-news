import React from "react";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
const Stories = () => {
  const { loading, hits, handleRemoveItem } = useGlobalContext();
  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <div className="stories">
      {hits.map((story) => {
        const { objectID, title, num_comments, url, points, author } = story;

        return (
          <article key={objectID} className="story">
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} poinsts by <span>{author}</span> {num_comments} comments
            </p>
            <div>
              <a
                href={url}
                className="read-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                read more
              </a>
              <button
                onClick={() => handleRemoveItem(objectID)}
                className="remove-btn"
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Stories;
