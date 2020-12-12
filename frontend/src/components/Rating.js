import React from "react";

import "../styles/components/Rating.css";

export default function Rating({ value, text, color }) {
  return (
    <>
      <div className="rating">
        <span>
          <i
            className={
              value >= 1
                ? "fas fa-star"
                : value >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 2
                ? "fas fa-star"
                : value >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 3
                ? "fas fa-star"
                : value >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 4
                ? "fas fa-star"
                : value >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 5
                ? "fas fa-star"
                : value >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
            style={{ color: color }}
          ></i>
        </span>
        <span className="ml-2">{text}</span>
      </div>
    </>
  );
}

Rating.defaultProps = {
  color: "#FAAE20",
};
