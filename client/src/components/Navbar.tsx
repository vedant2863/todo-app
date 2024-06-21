import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./shared/Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const authStatus = false;

  const menuItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "SignIn",
      slug: "/signIn",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Todos",
      slug: "/todos",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile/:id",
      active: authStatus,
    },
  ];

  return (
    <header className="flex justify-between items-center cursor-default px-20 py-2 mt-1">
      <div className="cursor-default">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="hidden lg:flex justify-evenly items-center">
        {menuItems.map(
          (item) =>
            item.active && (
              <li key={item.name} className="list-none">
                <Link to={item.slug} className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
                  {item.name}
                </Link>
              </li>
            )
        )}
      </div>
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        >
          <Menu className="h-6 w-6 cursor-pointer" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 right-0 h-full bg-black flex flex-row justify-between w-3/4 p-5">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.slug}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-md cursor-pointer text-white"
              >
                {item.name}
              </Link>
            ))}
          </div> 
          <div className="flex justify-end h-12 rounded-full">
            <button
              onClick={toggleMenu}
              className="px-6 py-2 duration-200 bg-red-800 hover:bg-blue-100 rounded-full"
            >
              <X className="fill-white h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
