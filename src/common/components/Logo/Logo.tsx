import { HTMLAttributes, memo } from "react";

import { configSelector } from "@app/selectors/common";
import logo from "@assets/images/encacapLogo.svg";
import useSelector from "@hooks/useSelector";

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
}

const Logo = ({ className, imageClassName }: LogoProps) => {
  const config = useSelector(configSelector);

  return (
    <div className={className}>
      <img src={logo} alt={config["app-name"] as string} className={imageClassName} />
    </div>
  );
};

export default memo(Logo);
