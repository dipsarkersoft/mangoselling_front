import React from 'react'
import '../assets/feataures.css'

import { FaCarSide, FaUserShield, FaExchangeAlt, FaPhoneAlt } from "react-icons/fa";

export const Feataures = () => {
  return (
    <div>





    <div className="container-fluid featurs py-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Feature 1: Free Shipping */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle bg_features mb-5 mx-auto">
                <FaCarSide size={48} className="text-white" /> {/* React Icon for Car */}
              </div>
              <div className="featurs-content text-center">
                <h5>Free Shipping</h5>
                <p className="mb-0">Free on order over <strong>BDT 1000</strong></p>
              </div>
            </div>
          </div>

          {/* Feature 2: Security Payment */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                <FaUserShield size={48} className="text-white" /> {/* React Icon for Shield */}
              </div>
              <div className="featurs-content text-center">
                <h5>Security Payment</h5>
                <p className="mb-0">100% security payment</p>
              </div>
            </div>
          </div>

          
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                <FaExchangeAlt size={48} className="text-white" /> 
              </div>
              <div className="featurs-content text-center">
                <h5>Original Product</h5>
                <p className="mb-0"> 100% Original Product</p>
              </div>
            </div>
          </div>

          {/* Feature 4: 24/7 Support */}
          <div className="col-md-6 col-lg-3">
            <div className="featurs-item text-center rounded bg-light p-4">
              <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto">
                <FaPhoneAlt size={48} className="text-white" /> {/* React Icon for Phone */}
              </div>
              <div className="featurs-content text-center">
                <h5>24/7 Support</h5>
                <p className="mb-0">Support anytime, fast response</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    </div>
  )
}
