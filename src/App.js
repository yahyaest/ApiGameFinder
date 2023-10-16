import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { StoreContextProvider } from "./store/store-context";
import Table from "./components/table";
import GameForm from "./components/gameForm";
import SearchForm from "./components/searchForm";
import Navbar from "./components/common/navbar";
import FavoriteForm from "./components/favoriteForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/registerForm";
import CorsPage from "./components/corsPage";
import "./App.css";

function App() {
  const environment = process.env.REACT_APP_ENV;
  const domain = process.env.REACT_APP_DOMAIN 
  return (
    <StoreContextProvider>
      <Router basename={environment === "PROD" ? domain : ""}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/games/:id" component={GameForm}></Route>
            <Route path="/search/:query?" component={SearchForm} />

            <Route path="/games" component={Table} />
            <Route path="/search" component={SearchForm} />
            <Route path="/favorites" component={FavoriteForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/enable-cors" component={CorsPage} />

            <Redirect from="/" exact to="/games" />
          </Switch>
        </div>
      </Router>
    </StoreContextProvider>
  );
}

export default App;
