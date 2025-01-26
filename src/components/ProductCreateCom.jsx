import React, { useEffect, useState } from "react";
import { allCategory, createProduct, imageUpload } from "../api/allapi";
import toast from "react-hot-toast";
import axios from "axios";

export const ProductCreateCom = () => {
  const token = localStorage.getItem("token");

  const [category, setCategory] = useState([]);
  const [selcategory, setSelcategory] = useState();

  const loadCategory = async () => {
    const data = await allCategory();
    if (data) {
      setCategory(data);
    }
    // console.log(data);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelcategory(categoryId);
    
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const image = form.get("image");
    const name = form.get("name");
    const description = form.get("description");
    const price = form.get("price");
    const quantity = form.get("quantity");

    if (!name || !description || !price || !quantity || !image || !selcategory) {
      toast.error("All fields are required!");
      return;
    }

    const body = new FormData();
    body.append("image", image);

    const { data } = await imageUpload(body);

    const imgurl = data.data.url;

    const sendData={
        "name": name,
        "description":description, 
        "price":price,
        "quantity":quantity,
        "image":imgurl,
        "categories":selcategory
    }
    const datares=await createProduct(token,sendData)
    // console.log(datares.status)
    if(datares.status){
      toast.success("Product Create Sucess")
      e.target.reset(); 
      setSelcategory("");
      
    }
  

    // console.log(quantity,price,description,name,imgurl,selcategory);

 

  };

 
  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <div>
      <div className="container my-4">
        <div className="row bg-light justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Create Product</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/*"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  className="form-control"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  className="form-control"
                  min={1}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="categories" className="form-label">
                  Categories
                </label>

                <select
                  className="form-select"
                  onChange={handleCategoryChange} // Call the handler
                >
                  <option value="">All</option>
                  {category?.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
