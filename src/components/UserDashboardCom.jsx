import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { OrderListComp } from "./orderListComp";
import { ProductCreateCom } from "./ProductCreateCom";
import MangoListCom from "./MangoListCom";

export const UserDashboardCom = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <ul className="nav nav-pills mb-3 gap-3" id="pills-tab" role="tablist">
        
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            {user.account_type == "Seller" ? <>All Order</> : <> My Order</>}
          </button>
        </li>

        { user.account_type=='Seller'? 
        <>

         <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-productcr-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-productcr"
            type="button"
            role="tab"
            aria-controls="pills-productcr"
            aria-selected="false"
          >
            Create Product
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-plist-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-plist"
            type="button"
            role="tab"
            aria-controls="pills-plist"
            aria-selected="false"
          >
           Product list
          </button>
        </li>
        
        
        </>
        :
        <></>
        }

       

        {/* <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-contact-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-contact"
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            My Reviews
          </button>
        </li> */}

      </ul>


      <div className="tab-content" id="pills-tabContent">
       
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
          tabindex="0"
        >
          <OrderListComp />
        </div>
        
        <div
          className="tab-pane fade"
          id="pills-productcr"
          role="tabpanel"
          aria-labelledby="pills-productcr-tab"
          tabindex="0"
        >

           <ProductCreateCom/>
          
        
        
        
        </div>
       
        <div
          className="tab-pane fade"
          id="pills-plist"
          role="tabpanel"
          aria-labelledby="pills-plist-tab"
          tabindex="0"
        >
          <MangoListCom/>
        </div>
        
        <div
          className="tab-pane fade"
          id="pills"
          role="tabpanel"
          aria-labelledby="pills-tab"
          tabindex="0"
        >
          ...
        
        </div>


      </div>
    </div>
  );
};
