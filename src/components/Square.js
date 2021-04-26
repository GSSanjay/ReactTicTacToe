import React, { createElement } from "react";
import "../App.css";

const Square = ({ val, chooseSquare }) => {
  let element = createElement;

  return (
    <>
      {val === "X"
        ? element(
            "h1",
            { className: "square style-x", onClick: chooseSquare },
            val
          )
        : element(
            "h1",
            { className: "square style-o", onClick: chooseSquare },
            val
          )}
    </>
  );
};

export default Square;
