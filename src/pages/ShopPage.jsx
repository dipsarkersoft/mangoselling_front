import React, { useEffect, useState } from 'react'
import { allCategory, allProducts } from '../api/allapi';
import { Link } from "react-router-dom";
import { AiOutlineShopping } from 'react-icons/ai';
export const ShopPage = () => {

   const [category, setCategory] = useState([]);
   const [products, setProducts] = useState([]);
   const [selectedcat, setSelectedcat] = useState("");
   const URL = "https://mangosellingbackend.onrender.com/";
 
 
  const getCategory = async () => {
     try {
       const data = await allCategory();
       setCategory(data);
     } catch (err) {
      //  console.log(err);
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
      //  console.log(err);
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
    <div>

      <div className="container my-4">
             
        <div className="row ">
        <div className="col-md-2">
            <h5>Filter by Category</h5>

            <select className="form-select" onChange={handleFilter}>
              <option value="">All</option>
              {category?.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
        </div>

        <div className="col-md-10">
            <div className="row">
              <h1 className="text-">
                Our All Products
              </h1>


              {products.map((product, index) => (
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
                          to={`${product.id}`}
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


    </div>
    </div>
    
  )
}
