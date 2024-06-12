import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Logo from "./shared/Logo";
import LogoutBtn from './LogoutBtn';

const Navbar = () => {
  const authStatus = useSelector((state:boolean) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", path: "/home", active: true },
    { name: "Todos", path: "/todos", active: !authStatus },
    { name: "About", path: "/about", active: !authStatus },
  ];

  return (
    <div>
      <Logo />
      <div>
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
              >
                {item.name}
              </button>
            </li>
          ) : null
        )}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </div>
    </div>
  );
};

export default Navbar;

