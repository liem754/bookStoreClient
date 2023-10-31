import { memo } from "react";

function Button({
  title,
  p,
  full,
  Click,
  textColor,
  bgColor,
  size,
  font,
  hover,
  sha,
}: any) {
  return (
    <button
      onClick={Click}
      className={`${p} ${textColor} ${bgColor} ${
        full ? "w-full" : ""
      } ${size} ${font} ${hover} ${sha}`}
    >
      {title}
    </button>
  );
}

export default memo(Button);
