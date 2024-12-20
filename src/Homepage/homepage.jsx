import React, { useState, useEffect, useRef } from "react";
import "./homepage.css";
import users from "./girman-users.json";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navbarRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        const navbar = document.querySelector(".navbar-collapse");
        if (navbar.classList.contains("show")) {
          navbar.classList.remove("show");
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const filteredData = users.filter((item) => {
    const fullName = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`;
    const searchChars = searchTerm.toLowerCase().split("");

    let searchIndex = 0;

    for (let i = 0; i < fullName.length; i++) {
      if (fullName[i] === searchChars[searchIndex]) {
        searchIndex++;
      }

      if (searchIndex === searchChars.length && i === searchChars.length - 1) {
        return true;
      }
    }

    return false;
  });

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="header-container">
      <header className="header">
        <div className="logo">
          <img
            src="girmanLogo2.png"
            alt="Girman Logo"
            className="girmanLogo2"
          />
          <h1 className="logo-text">
            Girman <span className="subtext">TECHNOLOGIES</span>
          </h1>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light" ref={navbarRef}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="#search" className="nav-link">
                    SEARCH
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="http://girmantech.com/"
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WEBSITE
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="https://www.linkedin.com/company/girmantech/"
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LINKEDIN
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="mailto:contact@girmantech.com"
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div
        className={`search-section ${
          searchTerm || isSearchFocused ? "brand-hidden" : ""
        }`}
      >
        <div
          className={`brand-name ${
            searchTerm || isSearchFocused ? "hidden" : ""
          }`}
        >
          <img src="girmanLogo.png" alt="Girman Logo" className="girmanLogo" />
          <h1 className="brand-name">Girman</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {searchTerm && filteredData.length > 0 && (
        <div className="cards">
          {filteredData.map((item, index) => (
            <div className="card" key={index}>
              <div className="profile">
                <img
                  src="public/profle-picture.png"
                  alt={`${item.first_name} ${item.last_name}`}
                />
                <h2 className="name">
                  {item.first_name} {item.last_name}
                </h2>
                <div className="location">
                  <span className="location-icon">
                    <i className="bi bi-geo-alt-fill"></i>
                  </span>
                  <span>{item.city}</span>
                </div>
              </div>
              <div className="card-bottom">
                <div className="phone">
                  <div>
                    <span className="phone-icon">
                      <i className="bi bi-telephone-fill"></i>
                    </span>
                    <span>{item.contact_number}</span>
                  </div>
                  <div>
                    <p>Available on phone</p>
                  </div>
                </div>
                <div>
                  <button
                    className="fetch-details-button"
                    onClick={() => handleFetchDetails(item)}
                  >
                    Fetch Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchTerm && filteredData.length === 0 && (
        <div className={`no-result ${filteredData.length === 0 ? "show" : ""}`}>
          <img src="public/no-result.png" alt="no result" />
          <h3>No result found.</h3>
        </div>
      )}

      {selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h1>Fetch details</h1>
              <p style={{ color: "gray" }}>
                Here are the details of the following employee.
              </p>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>

              <p>
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.contact_number}
              </p>
              <p>
                <strong>Profile Image:</strong>
              </p>
              <img
                src="public/profle-picture.png"
                alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
