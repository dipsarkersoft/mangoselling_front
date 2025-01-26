import React, { useEffect, useState } from "react";
import { allCategory, allProducts } from "../api/allapi";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { Feataures } from "../components/Feataures";
import "../assets/home.css";
import { AiOutlineShopping } from "react-icons/ai";
import hero1 from "../assets/images/hero1.png";
import hero2 from "../assets/images/hero2.jpg";
import { FaUsers } from "react-icons/fa";
import Footer from "../components/Footer";
import { Testimonial } from "./Testimonial";

export const HomePage = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedcat, setSelectedcat] = useState("");
  const URL = "https://mangosellingbackend.onrender.com/";

  const getCategory = async () => {
    try {
      const data = await allCategory();
      setCategory(data);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleFilter = (e) => {
    const categoryId = e.target.value;
    setSelectedcat(categoryId);
  };

  const getProducts = async () => {
    try {
      const { data } = await allProducts(selectedcat);
      setProducts(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    getProducts(selectedcat);
  }, [selectedcat]);

  return (
    <>
      <div className="container my-4">
        <HeroSection />

   

        <div className="row">
         

          {/* Product Section */}

          <div className="col-md-10">
            <div className="row">
              <h1 className="text-">
                Top Selling Product
              </h1>


              {products.slice(0, 3).map((product, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="border rounded position-relative vesitable-item">
                    <div className="vesitable-img">
                      <img
                        src={product.image}
                        className="img-fluid w-100 rounded-top"
                        alt={product.name}
                      />
                    </div>
                    <div
                      className="text-white bg-primary px-3 py-1 rounded position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    >
                      {/* { category.name} */}
                      Mango
                    </div>
                    <div className="p-4 rounded-bottom">
                      <h4>{product.name}</h4>
                      <p>{product.description.slice(0, 20)}</p>

                      <p className="text-dark fs-5 fw-bold mb-0">
                        Price: {product.price}
                      </p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <Link
                          to={`mango/${product.id}`}
                          className="btn mt-4 border         border-danger bg-success rounded-pill text-white"
                        >
                          <AiOutlineShopping className="me-2 text-white" />
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

           
          </div>
        </div>
        <Link to={"/mango"}><h3 className="text-end"> Show All Products</h3> </Link>
      </div>

      <Feataures />

      <Testimonial/>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="bg-light p-5 rounded">
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5 text-center shadow-sm">
                <FaUsers size={50 } />
                  <h4 className="mt-3">Satisfied Customers</h4>
                  <h1 className="fw-bold">1963</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5 text-center shadow-sm">
                <FaUsers size={50 } />
                  <h4 className="mt-3">Quality of Service</h4>
                  <h1 className="fw-bold">99%</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5 text-center shadow-sm">
                <FaUsers size={50 } />
                  <h4 className="mt-3">Quality Certificates</h4>
                  <h1 className="fw-bold">33</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className="counter bg-white rounded p-5 text-center shadow-sm">
                <FaUsers size={50 } />
                  <h4 className="mt-3">Available Products</h4>
                  <h1 className="fw-bold">789</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Footer/>
    </>
  );
};
