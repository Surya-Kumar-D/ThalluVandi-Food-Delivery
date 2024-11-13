import { ShoppingCartIcon } from "lucide-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStore from "../store/store";
import api from "../Api/api";
import toast from "react-hot-toast";
function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const totalItems = useStore((state) => state.totalItems);
  const { slug } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/v1/users/check", {
          withCredentials: true,
        });
        console.log(res);

        setIsAuthenticated(res.data.authenticated);
        setUser(res.data.user);
        toast.success(`You are most welcome! 😁, ${res.data.user.name}`);
      } catch {
        setIsAuthenticated(false);
        toast.error("there was an error logging in");
      }
    };
    checkAuth();
  }, []);

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
        {isAuthenticated ? (
          <>
            <p className="text-[#968f68]">My Account</p>
            <div className="h-[80px] w-[80px] ">
              <img
                src={user.photo}
                alt={user?.name}
                className="w-full h-full rounded-full"
              />
            </div>
          </>
        ) : (
          <>
            <Link to={"/signup"}>
              <button className="px-4 py-2 bg-white rounded-2xl text-[#968f68] overflow-hidden">
                Sign Up
              </button>
            </Link>
            <Link to={"#"}>
              <button className="px-4 py-2 bg-white rounded-2xl text-[#968f68]">
                Login
              </button>
            </Link>
          </>
        )}
        <Link to={"#"} className="relative">
          <ShoppingCartIcon className="text-[#968f68]  box-content px-4 py-2 bg-white rounded-2xl" />
          <span className="text-[1.3rem] text-[#968f68] absolute top-[25px] left-[40px] font-bold z-10">
            {totalItems && totalItems > 0 ? totalItems : ""}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
