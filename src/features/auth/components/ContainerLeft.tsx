import { memo } from "react";

import leftVector from "@assets/images/loginLeftVector.png";
import { Logo } from "@components/Logo";

const AuthContainerLeft = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary bg-opacity-10">
      <div className="flex-1 p-12">
        <Logo imageClassName="h-24" />
      </div>
      <img alt="Logo" className="h-64 flex-shrink-0" src={leftVector} />
    </div>
  );
};

export default memo(AuthContainerLeft);
