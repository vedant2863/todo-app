import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to={"/"}>
      <img
          src="vite.svg"
          alt="LOGO"
          width={"50px"}
          height={"50px"}
          className=""
        />
      </Link>
    </div>
  );
};

export default Logo;
