import { ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [slug]);

  return (
    <nav
      className={`h-[80px] w-full duration-[.5s] ease-in-out flex px-[3rem] ${
        isScrolled ? "fixed bg-white z-10" : ""
      }`}
    >
      <div className="self-center text-[1.3rem] font-bold">
        <Link to={"/"}>Thalluvandi Food</Link>
      </div>
      <div className="w-[100px] h-[100px] m-auto ">
        <Link to={"/"}>
          <img
            className="w-full h-full rounded-full"
            src="/img/logo.webp"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex items-center  justify-center gap-4 mr-[2rem] text-[1.3rem]">
        <Link to={"#"}>
          <button className="px-4 py-2 bg-white rounded-2xl text-[#968f68]">
            Sign Up
          </button>
        </Link>
        <Link to={"#"}>
          <button className="px-4 py-2 bg-white rounded-2xl text-[#968f68]">
            Login
          </button>
        </Link>
        <Link to={"#"}>
          <ShoppingCartIcon />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
