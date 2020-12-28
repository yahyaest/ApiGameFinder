import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { NavLink, Link } from "react-router-dom";
import { useStateValue } from "./stateProvider";
import { auth } from "../firebase";

const Navbar = () => {
  const [{ favoriteGames, user }] = useStateValue();
  const [show, handleShow] = useState(false);


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

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".navList");
    const navLinks = document.querySelectorAll(".navList li");

    burger.addEventListener("click", () => {
      // Toggle Nav
      nav.classList.toggle("nav-active");
      //Animate Links
      navLinks.forEach((link, index) => {
        console.log(index);
        console.log(index / 5 + 0.5);
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

  return (
    <div className={`navBar ${show && "nav_color"}`}>
      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <Link to="/">
        <img
          className="navLogo"
          src="https://www.gamestop.ie/Views/Locale/promoPages/LandingPages/E3/images/logo.png"
          alt="E3-Logo"
        />
      </Link>

      <NavLink to={!user && "/login"}>
        <div onClick={login} className="login__option">
          <span className="login__optionLineOne">Hello {user?.email}</span>
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
        <NavLink to={user ? "/favorites" : "/"}>
          <SportsEsportsIcon />
        </NavLink>
        <span className="fav__number">{user ? favoriteGames.length : 0}</span>
      </div>
    </div>
  );
};

export default Navbar;
