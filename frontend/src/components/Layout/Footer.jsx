import React, { useContext } from "react";
import { Context } from "../../main";

import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithZeeshu.</div>
    </footer>
  );
};

export default Footer;
