import React, { useEffect, useState } from "react";
import "../assets/cartpage.css";
import { createOrder, paymentAPI, sessionKeyAPI } from "../api/allapi";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

const URL = "https://mangosellingbackend.onrender.com/";

export const CartPage = () => {
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState([]);
  const { isAuth } = useAuth();
  // console.log(user)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart"));
    setCart(data);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleIncrement = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // from cart

  const [formData, setFormData] = useState({
    address: "",
    deliveryPostCode: "",
    deliveryPhone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { address, deliveryPostCode, deliveryPhone } = formData;

    if (!deliveryPhone || !deliveryPostCode || !address) {
      toast.error("Please fill in all the fields.");
      return;
    }
    if (isNaN(deliveryPhone)) {
      toast.error(" Phone IS A number fields ");
      return;
    }
    if (isNaN(deliveryPostCode)) {
      toast.error(" PostCode IS A number fields ");
      return;
    }

    const body = {
      address: address,
      deliveryPhone: deliveryPhone,
      totalammount: calculateTotal(),
    };

    // console.log(address,deliveryPostCode,deliveryPhone);
    const data = await paymentAPI(token, body);
    window.location.replace(data.data.GatewayPageURL);
    // console.log(data.transId)

    localStorage.setItem("transId", JSON.stringify(data.transId));
    localStorage.setItem("address", JSON.stringify(address));
    localStorage.setItem("deliveryPhone", JSON.stringify(deliveryPhone));
    localStorage.setItem("totalammount", JSON.stringify(calculateTotal()));
    localStorage.setItem("deliveryPostCode", JSON.stringify(deliveryPostCode));

    // cheakout(address,deliveryPostCode,deliveryPhone);
  };

  //  no edit
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  return (
    <>
      <section
        className="cart-page"
        style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
      >
        <div className="container">
          <h3>Shopping Cart</h3>
          {!cart || cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="row">
              <div className="col-md-6">
                {cart.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="card-body d-flex align-items-center">
                      <img
                        src={item?.image}
                        alt={item.name}
                        className="img-thumbnail me-3"
                        style={{ width: "80px" }}
                      />
                      <div className="flex-grow-1">
                        <h5>{item.name}</h5>
                        <p> BDT {item.price * item.quantity}</p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDecrement(item.id)}
                          className="btn btn-outline-secondary btn-sm me-1"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.id)}
                          className="btn btn-outline-secondary btn-sm ms-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="btn btn-danger btn-sm ms-3"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <div className="row justify-content-center">
                  <div className="card">
                    <div className="card-body">
                      <h5>Summary</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                          Products
                          <div>
                            {cart.map((item, i) => (
                              <span key={i}>
                                {item.name}
                                {i < cart.length - 1 && ","}{" "}
                              </span>
                            ))}
                          </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          Shipping
                          <span>Free</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Total</strong>
                          <strong>BDT {calculateTotal()}</strong>
                        </li>
                      </ul>
                      <div className="card-body">
                        <h5>Shipping Information</h5>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="gap-4 d-flex">
                            <div className="">
                              <label
                                htmlFor="phoneNumber"
                                className="form-label"
                              >
                                Phone Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="deliveryPhone"
                                name="deliveryPhone"
                                value={formData.deliveryPhone}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="">
                              <label
                                htmlFor="deliveryPostCode"
                                className="form-label"
                              >
                                Postcode
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="deliveryPostCode"
                                name="deliveryPostCode"
                                value={formData.deliveryPostCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          {isAuth ? (
                            <>
                              <button
                                type="submit"
                                className="btn btn-primary w-100 mt-3"
                              >
                                Proceed to Checkout
                              </button>
                            </>
                          ) : (
                            <>
                              <Link to={"/login"}>
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100 mt-3"
                                >
                                  Login
                                </button>
                              </Link>
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
