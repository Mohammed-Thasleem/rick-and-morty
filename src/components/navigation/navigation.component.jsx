import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./navigation.styles.scss";
import logo from "../../rick-and-morty-31015.png";

const Navigation = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

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
              <NavLink
                to="/"
                className="nav-links"
                // activeClassName="active"
                onClick={click ? handleClick : null}
              >
                Characters
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/episodes"
                className="nav-links"
                // activeClassName="active"
                onClick={click ? handleClick : null}
              >
                Episodes
              </NavLink>
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
