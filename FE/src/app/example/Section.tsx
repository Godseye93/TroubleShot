import React from "react";

interface ISectionProps {
  pageNum: number;
  bgColor: string;
  window: Window;
  pageRefs: React.MutableRefObject<HTMLDivElement[]>;
}

const Section = (props: ISectionProps) => {
  return (
    <div
      ref={(element) => {
        props.pageRefs.current[props.pageNum] = element!;
      }}
      className={`w-screen h-screen ${props.bgColor}`}
    >
      <span>Page {props.pageNum}</span>
    </div>
  );
};

export default Section;