import { CodeXml, Github, LinkedinIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-white  gap-5 p-[5rem] text-[1.1rem] flex-col flex justify-center items-center h-auto w-full">
      <div className="font-bold text-[1.3rem] flex items-center gap-2 object-cover">
        <img
          src="/img/logo.webp"
          className="w-[100px] rounded-full h-[100px]"
          alt="logo"
        />
        <p>Thalluvandi Food</p>
      </div>
      <p className="text-[1rem] max-w-[75rem] text-center ">
        Thalluvandi Food is a food delivery service that provides a wide range
        of dishes to customers. We offer a variety of dishes that are spicy,
        vegetarian, and healthy. Our goal is to provide a convenient and
        enjoyable experience for our customers.
      </p>
      <div className="flex flex-col items-center gap-4">
        <p>This Project is done by</p>
        <span className="text-[#968f68] transition-transform ease-in-out inline-block hover:scale-[2] ">
          SURYA KUMAR D
        </span>
        <span className="flex items-center justify-center gap-4">
          <Link to="https://github.com/Surya-Kumar-D">
            <Github
              color="#FFDF00"
              height={24}
              width={35}
              className="hover:scale-[1.4] inline-block"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/surya-kumar-d-192808330/">
            <LinkedinIcon
              color="#FFDF00"
              height={24}
              width={35}
              className="hover:scale-[1.4] inline-block"
            />
          </Link>
          <Link to="https://icodethis.com/Surya_Kumar_D">
            <CodeXml
              color="#FFDF00"
              height={24}
              width={35}
              className="hover:scale-[1.4] inline-block"
            />
          </Link>
          <Link
            to="https://cssbattle.dev/player/surya_kumar_d"
            className="self-center"
          >
            <img
              src="img/css-battle.png"
              alt="css battle"
              className="w-[35px] h-[24px] text-black hover:scale-[1.2]"
            />
          </Link>
        </span>
      </div>
      <p>&copy; {new Date().getFullYear()} Thalluvandi Food</p>
    </footer>
  );
}

export default Footer;
