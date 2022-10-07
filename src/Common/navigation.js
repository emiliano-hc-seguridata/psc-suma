import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../logo-white-sm.png';

const Navigation = () => {
    return (
      <nav>
        <img className="logo" src={logo} alt="Seguridata logo"></img>
        <NavLink to="/home">Inicio</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/admin">Firma electrónica</NavLink>
        <NavLink to="/admin">Documentación</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>
    );
  };

  export default Navigation;