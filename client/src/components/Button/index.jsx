import React from "react";

const Button = ({ type = "submit", children, outline = "none", width, height, background, border, borderRadius, marginTop, marginLeft, marginRight, marginBottom, padding, color, cursor="pointer", onClick }) => {

  const styleButton = {
    width: width,
    height: height,
    background: background,
    border: border,
    borderRadius: borderRadius,
    outline: outline,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft,
    padding: padding,
    color: color,
    cursor: cursor
  }

  return (
    <button style={styleButton} type={type} onClick={onClick}>{children}</button>
  );
}

export default Button;