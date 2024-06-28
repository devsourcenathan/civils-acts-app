import React from "react";
import svg from "./mk_logo.svg"
import { Badge } from "antd";
export const FinefoodsLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <Badge count="Gestion Action Civil" />
  // <img src={svg} height={80} width={60} />
);

export const FinefoodsLogoText: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <></>
    // <img src={svg} height={100} width={120} />
  );
};
