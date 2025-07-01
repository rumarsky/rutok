import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdExplore, MdPerson, MdSettings, MdLogin } from 'react-icons/md';
import './Sidebar.css';
import authService from '../services/authService';

function Sidebar() {
  const isAuth = !!authService.getAccessToken();

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        RuTok
      </div>
      <hr className="sidebar-divider" />
      <div className="sidebar-links">
        <NavLink
          to="/"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          title="Главная"
          end
        >
          <MdHome className="sidebar-icon" />
          Главная
        </NavLink>
        <NavLink
          to="/recommendations"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          title="Рекомендации"
        >
          <MdExplore className="sidebar-icon" />
          Рекомендации
        </NavLink>
        {isAuth ? (
          <NavLink
            to="/profile"
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
            title="Профиль"
          >
            <MdPerson className="sidebar-icon" />
            Профиль
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
            title="Вход"
          >
            <MdLogin className="sidebar-icon" />
            Вход
          </NavLink>
        )}
      </div>
      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className="sidebar-link sidebar-link-bottom"
          title="Настройки"
        >
          <MdSettings className="sidebar-icon" />
          <span className="sidebar-link-text">Настройки</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;