import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdExplore, MdPerson, MdSearch, MdSettings } from 'react-icons/md';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        RuTok
      </div>
      <div className="sidebar-search">
        <MdSearch className="sidebar-search-icon" />
        <input
          type="text"
          className="sidebar-search-input"
          placeholder="Поиск"
        />
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
        <NavLink
          to="/profile"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          title="Профиль"
        >
          <MdPerson className="sidebar-icon" />
          Профиль
        </NavLink>
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