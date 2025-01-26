import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import cartIcon from "../assets/cart.png";

export const NavBarCom = () => {
  const { logout, isAuth, user } = useAuth();
  const { account_type } = user;

  const navigate = useNavigate();
  const handleLogout = async () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>






<div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid">
            <Link className="navbar-brand" to={'/'}>
              RAJSHAHIR AM
            </Link>
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
              <ul className="navbar-nav ms-auto gap-1">
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  ></Link>
                </li>

                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/mango"} className="nav-link">
                    Mango
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/contact"} className="nav-link">
                    Contact
                  </Link>
                </li>

                {isAuth ? (
                  <>
                    <li className="nav-item">
                      {account_type == "Seller" ? (
                        <>
                          <Link to={"/dashboard/seller/"} className="nav-link">
                            Dashboard
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to={"/dashboard/"} className="nav-link">
                            Dashboard
                          </Link>
                        </>
                      )}
                    </li>

                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                      Profile
                      </button>
                      <ul className="dropdown-menu">
                         
                      <li>
                          <Link
                           
                           
                            className="nav-link"
                             to={"/profile"}

                          >
                            My Profile
                          </Link>
                        </li>
                        
                        <li>
                          <Link
                            to={"/logout"}
                            onClick={handleLogout}
                            className="nav-link"
                          >
                            Logout
                          </Link>{" "}
                        </li>


                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div >
              <Link className="" to={"/cart"}>
                <img className="navbar-cart pe-2" src={cartIcon} alt="" />
              </Link>
            </div>
          </div>
      </nav>
    </div>
    </>
  );
};
