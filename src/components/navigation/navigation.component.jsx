import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../../assets/rick-and-morty-31015.png";
import "./navigation.styles.scss";

const Navigation = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo-container">
            <img src={logo} className="nav-logo" alt="logo" />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/"
                className={pathname === "/" ? "active" : "nav-links"}
                onClick={click ? handleClick : null}
              >
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/episodes"
                className={pathname === "/episodes" ? "active" : "nav-links"}
                onClick={click ? handleClick : null}
              >
                Episodes
              </Link>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
