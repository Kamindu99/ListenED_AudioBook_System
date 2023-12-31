import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [name, setName] = React.useState("");
  const [admin, setAdminName] = React.useState("");

  const clr = localStorage.getItem("firstColor1");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 99) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  useEffect(() => {
    const myData = localStorage.getItem("myData");
    const myDataObject = JSON.parse(myData);
    const islogin = myDataObject;
    setAdminName(myDataObject?.name);
    console.log(islogin);
    if (islogin == null) {
      setLogin(true);
    } else {
      if (islogin.userRole == "3") {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("myData");
    // showMessageDialog("Success", "Booking Added Successfully", "/mybookings");
  };

  useEffect(() => {
    const name = localStorage.getItem("name");

    if (name !== null || name !== undefined) {
      setName(name);
    }
  }, [name]);

  const handleuserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userInfo.");
    localStorage.removeItem("myData");
  };

  const str = window.location.href;

  const isHome = str.includes("/home");
  const isalltrains = str.includes("/books-home");
  const issearch = str.includes("/search");
  const ismybookings = str.includes("/recommendations");
  const islogin = str.includes("/login");
  const isAboutUs = str.includes("/about");
  const isQuiz = str.includes("/quiz");
  const [isDownloadDropdownOpen, setIsDownloadDropdownOpen] = useState(false);

  const [userType1, setUserType] = useState("");

  useEffect(() => {
    const myData = localStorage.getItem("myData");
    const myDataObject = JSON.parse(myData);

    if (myDataObject == null) {
      setUserType("2");
    } else {
      if (myDataObject.userRole == "1") {
        setUserType("1");
      } else if (myDataObject.userRole == "3") {
        setUserType("3");
      } else {
        setUserType("0");
      }
    }
  }, []);

  const navbarStyle = {
    backgroundColor: clr ? clr : "#FF4500",
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${isSticky ? "stickynav" : "normalnav"
        }`}
      style={{ background: clr ? clr : "#FF4500" }}
    >
      <div className="container-fluid">
        <div className="navbar-heading mt-2">
          <h3 style={{ marginLeft: "30px" }}>
            <a className="navbar-h ms-5" to="/">
              <img
                src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1698612919/logolistened_gahh2l.png"
                style={{ height: "50px" }}
                alt="Logo"
                className="logo-image me-3"
              />
              ListenEd
            </a>
          </h3>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav  mb-2 mb-lg-0 ms-auto"
            style={{ marginRight: "5%" }}
          >
            <li className="nav-item">
              <a
                className={`nav-link nav-link-a-text me-3 ${isHome ? "active" : ""
                  }`}
                href="/"
              >
                ප්‍රධාන පිටුව
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/books-home"
                className={`nav-link me-3 nav-link-a-text ${isalltrains ? "active" : ""
                  }`}
              >
                Audio පොත්
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/search"
                className={`nav-link me-3 nav-link-a-text ${issearch ? "active" : ""
                  }`}
              >
                සොයන්න
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/recommendations"
                className={`nav-link me-3 nav-link-a-text ${ismybookings ? "active" : ""
                  }`}
              >
                නිර්දේශයන්
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link nav-link-a-text me-3 ${isQuiz ? "active" : ""
                  }`}
                href="/quiz"
              >
                ප්‍රශ්නාවලිය
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link nav-link-a-text me-3 ${isAboutUs ? "active" : ""
                  }`}
                href="/about"
              >
                අපි ගැන
              </a>
            </li>

            <li
              className="nav-item dropdown"
              onClick={() => setIsDownloadDropdownOpen(!isDownloadDropdownOpen)}
            >
              {!isLogin ? (
                <a
                  className={`nav-link nav-link-a-text me-3 dropdown-toggle ${islogin ? "active" : ""
                    }`}
                  type="button"
                  role="button"
                  id="downLoadDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDownloadDropdownOpen}
                >
                  {admin}
                </a>
              ) : name ? (
                <a
                  className={`nav-link nav-link-a-text me-3 dropdown-toggle ${islogin ? "active" : ""
                    }`}
                  type="button"
                  role="button"
                  id="downLoadDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDownloadDropdownOpen}
                >
                  {name}
                </a>
              ) : (
                <a
                  className={`nav-link nav-link-a-text me-3 dropdown-toggle ${islogin ? "active" : ""
                    }`}
                  type="button"
                  role="button"
                  id="downLoadDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDownloadDropdownOpen}
                >
                  Login
                </a>
              )}

              <ul
                className={`dropdown-menu${isDownloadDropdownOpen ? " show" : ""
                  }`}
                aria-labelledby="downLoadDropdown"
              >
                {!isLogin ? (
                  <div>
                    <li>
                      <a className={`dropdown-item `} href="/adminProfile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item `}
                        href="/login"
                        onClick={handleLogout}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : name ? (
                  <div>
                    <li>
                      <a className={`dropdown-item `} href="/profile">
                        Profile
                      </a>
                    </li>

                    <li>
                      <a className={`dropdown-item `} href="/fontselect">
                        සැකසුම්
                      </a>
                    </li>

                    <li>
                      <a
                        className={`dropdown-item `}
                        style={{ cursor: "pointer" }}
                        onClick={handleuserLogout}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : name ? (
                  <div>
                    <li>
                      <a className={`dropdown-item `} href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className={`dropdown-item `}
                        style={{ cursor: "pointer" }}
                        onClick={handleuserLogout}
                      >
                        LogOut
                      </a>
                    </li>
                  </div>
                ) : (
                  <div>
                    <li>
                      <a className={`dropdown-item `} href="/login">
                        User Login
                      </a>
                    </li>
                  </div>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
