import React, { useContext, useEffect, useState } from "react";
import "../../css/navbar.css";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../../utils/firebase";
import StoreContext from "../../store/store-context";

const Navbar = () => {
  const storeCtx = useContext(StoreContext);
  const [show, handleShow] = useState(false);
  const user = localStorage.getItem(`user`);
  const favoriteGames = storeCtx.favoriteGames;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  
  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".navList");
    const navLinks = document.querySelectorAll(".navList li");

    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active");
      //Animate Links
      navLinks.forEach((link, index) => {
        // console.log(index);
        // console.log(index / 5 + 0.5);
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 5 + 0.5
          }s`;
        }
      });
      //Burger Animation
      burger.classList.toggle("toggle");
    });
  }, []);

    const logout = () => {
      if (user) {
        auth.signOut();
        localStorage.removeItem(`user`);
        storeCtx.userLogout();
      }
    };

  return (
    <div className={`navBar ${show && "nav_color"}`}>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <Link to="/">
        <img className="navLogo" src="/images/E3_Logo.png" alt="E3-Logo" />
      </Link>

      <NavLink to={!user && "/login"}>
        <div onClick={logout} className="login__option">
          {user && <span className="login__optionLineOne">Hello {user}</span>}
          <span className="login__optionLineTwo">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </div>
      </NavLink>

      <ul className="navList ">
        <li>
          <NavLink className="popular__games" to="/games">
            Popular Game
          </NavLink>
        </li>
        <li>
          <NavLink className="search__game" to="/search">
            Search
          </NavLink>
        </li>
      </ul>

      <div className="fav__games">
        <NavLink to={user ? "/favorites" : "/login"}>
          <SportsEsportsIcon />
        </NavLink>
        <span className="fav__number">
          {favoriteGames ? favoriteGames.length : 0}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
