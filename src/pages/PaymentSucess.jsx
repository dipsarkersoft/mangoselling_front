import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createOrder } from '../api/allapi';
import toast from 'react-hot-toast';
import '../assets/payment.css'


export  const PaymentSucess = () => {
    const [cart, setCart] = useState([]);
    const { id } = useParams(); 
    const [loading,setLoading]=useState(true)
  
    const token = localStorage.getItem("token");
    const transId = JSON.parse(localStorage.getItem("transId")); 
  
    const data = JSON.parse(localStorage.getItem("cart"));
    const address = JSON.parse(localStorage.getItem("address"));
    const deliveryPhone = JSON.parse(localStorage.getItem("deliveryPhone"));
    const postcode = JSON.parse(localStorage.getItem("postcode"));
    const [isordone,setIsordone]=useState(true)
    
    useEffect(() => {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      setCart(cartData || []);
    }, []);
  
    
    const checkout = async () => {
      
      
     
  
      if (!data || data.length === 0) {
        // console.log("No products to checkout.");
        return;
      }
  
      const products = data.map(item => ({
        mango: item.id,
        quantity: item.quantity,
        address: address,
        delivery_post_code: postcode,
        deliveryPhone: deliveryPhone,
      }));
  
      try {

        // Create order
        if(!isordone){
            return false
        }

        const result = await createOrder(token, products);
        
  
        if ( isordone && result.status === 'Sucess') {
            setIsordone(false)
          
          localStorage.removeItem('cart');
          localStorage.removeItem('transId');
          localStorage.removeItem('address');
          localStorage.removeItem('deliveryPhone');
          localStorage.removeItem('totalammount');
          localStorage.removeItem('deliveryPostCode');
  
          toast.success("Order Success");
          setCart([]);
          setLoading(false)  
        }
         else {
          toast.error("Order creation failed");
        }
      } catch (error) {
       
        toast.error(" Please try again.");
      }
    };
  
   
    useEffect(() => {
    
      if (id && transId && id === transId) {
        checkout();
      }
    }, [id, transId]);

  return (
    <div>
      {loading?
      
      <>
      <h1>Laoding...</h1>
      </>
      :<>
      
        <div className="status-page success-page container d-flex flex-column align-items-center justify-content-center">
      <div className="alert alert-success text-center" role="alert">
        <h1 className="display-4">Success!</h1>
        <p className="lead">Your Order And Payment was completed successfully.</p>
      </div>
      <Link to="/" className="btn btn-primary mt-3">
        Go to Homepage
      </Link>
       </div>
      </>}
     



    </div>
  );
};

