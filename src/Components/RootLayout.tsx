import { Outlet } from "react-router-dom";

import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
function RootLayout() {
  return (
    <div className="flex flex-col gap-[3rem]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
