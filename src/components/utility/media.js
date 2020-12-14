import { useMediaQuery } from "react-responsive";
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const TabletMobile = ({ children }) => {
  const isDesktop = useMediaQuery({ maxWidth: 992 });
  return isDesktop ? children : null;
};
export const TabletDesktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop ? children : null;
};
export const Mobile = ({ children }) => {
  const isDesktop = useMediaQuery({ maxWidth: 768 });
  return isDesktop ? children : null;
};
