import React, { ButtonHTMLAttributes } from "react";

function ButtonAnchor(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`link ${props.className}`}>
      {props.children}
    </button>
  );
}

export default ButtonAnchor;
