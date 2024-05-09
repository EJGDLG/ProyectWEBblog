import React from 'react';

const NavBar = () => {
  return (
    <nav>
      <div className="container">
        <div className="profile-picture">
          <img src="img/logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search for creator, inspirations, and projects" />
        </div>
        <div className="create">
          <label className="btn btn-primary" htmlFor="create-post">Create</label>
          <div className="profile-photo">
            <img src="img/img01.jpg" alt="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
