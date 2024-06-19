import { HTMLAttributes, memo } from "react";

const EllipseRedLine = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      width="1131"
      height="455"
      viewBox="0 0 1131 455"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1132 6.00001C1008.33 -8.33332 722 0.399994 566 150C371 337 309 482 1 527M1132 124C1020 112 787 85 659 177C516.839 279.178 430 455 134 527M1132 243C1039.33 220.667 824 177 659 289C457.942 425.476 308 527 213 527M1132 380C1043 354.667 891 278 685 355C509.757 420.504 405 516 297 527"
        stroke="url(#paint0_linear_1145_531)"
        strokeWidth="2"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_1145_531"
          x1="566.5"
          y1="1.10791"
          x2="566.5"
          y2="527"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF6A59" stopOpacity="0.2"></stop>
          <stop offset="0.526042" stopColor="#FF6A59"></stop>
          <stop offset="1" stopColor="#FF6A59" stopOpacity="0.2"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default memo(EllipseRedLine);
