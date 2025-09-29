import * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="52"
    height="18"
    viewBox="0 0 52 18"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={props["aria-label"] ? undefined : true}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2834 0L5.27201 3.47739L0 18H7.20232L11.0745 7.33334L15.5848 7.33333L11.7126 18H18.9149L22.7871 7.33333H27.2977L23.4255 18H30.6278L33.4592 10.2004L36.2906 18H42.1132L45.5426 16.0162L51.3568 0H44.1545L40.5565 9.9112L37.0604 0.280427L37.1622 0H36.9586H29.9598H29.7562H25.4493H18.2469H13.7367H11.2834Z"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
