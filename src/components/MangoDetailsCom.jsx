import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryByid, mangoDetailsAPI, reviewByManId, URL } from "../api/allapi";
import toast from "react-hot-toast";
import { ReviewListComponents } from "./ReviewListComponents";
import { FaMinus, FaPlus, FaShoppingBag, FaStar } from "react-icons/fa";

export const MangoDetailsCom = () => {
  const { id } = useParams();
  const [mango, setMango] = useState({});
  const [cart, setCart] = useState([]);
  const [cateNm,setCateNm]=useState(null)

  const mangoDetails = async () => {
    try {
      const { data } = await mangoDetailsAPI(id);
      setMango(data);
      const catd=data.categories

      const res = await getCategoryByid(catd)
      setCateNm(res.name)
      
     
    } catch (err) {
      // console.log(err);
    }
  };

  const addToCart = (product) => {
    const { id, image, name, price } = product;

    const prevdata = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExi = prevdata.findIndex((item) => item.id === id);

    if (alreadyExi !== -1) {
      prevdata[alreadyExi].quantity += 1;
    } else {
      const addPro = {
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      };
      prevdata.push(addPro);
    }

    localStorage.setItem("cart", JSON.stringify(prevdata));
    setCart(prevdata);
    toast.success(`${name} Added to Cart`);
  };



  

  useEffect(() => {
    mangoDetails();  
  }, []);


  return (
    <>
      <div className="container my-5">

      

     <div className="row g-4">
     
     <div className="col-lg-6 ">
       <div className="border rounded">
         
           <img
              src={mango?.image}
              alt={mango.name}
             className="img-fluid rounded"
            
           />
         
       </div>
     </div>

   
     <div className="col-lg-6 p-5">
       <h4 className="fw-bold mb-3">{mango.name}</h4>
       <p className="mb-3">Category: {cateNm}</p>

       <h5 className="fw-bold mb-3"> <span className="">Price:</span> {mango.price}  BDT</h5>
       <h5 className="fw-bold mb-3">Available {mango.quantity}  KGS</h5>

       <div className="d-flex mb-4">
         <FaStar className="text-secondary" />
         <FaStar className="text-secondary" />
         <FaStar className="text-secondary" />
         <FaStar className="text-secondary" />
         <FaStar />
       </div>
       <p className="mb-4">
       {mango.description?.slice(0, 100)}
       </p>
       


       <div className="">
              {mango.quantity != 0 ? (
                <>
                  <button
                    onClick={() => addToCart(mango)}
                    className="btn btn-primary "
                  >
                    Add To Cart
                  </button>
                </>
              ) : (
                <>
                  <button disabled className="btn btn-danger ">
                    Sold Out
                  </button>
                </>
              )}

              
            </div>

       

     </div>
     </div>

     <div className="mt-5">

     <ul className="nav nav-tabs gap-3" id="myTab" role="tablist">

  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Description</button>
  </li>

  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">All Review</button>
  </li>

</ul>

<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
   <div className="m-2 p-3"></div>
    {mango.description}
    
    </div>
  <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">


  <ReviewListComponents/>

  </div>
 
</div>


     </div>




        {/* <div className="col-md-4">
        <div className="">
        
              <ReviewListComponents/>
              </div>
        </div> */}

        






       
      </div>
    </>
  );
};
