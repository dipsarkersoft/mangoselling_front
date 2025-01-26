import React, { useEffect, useState } from "react";
import { allorderView, createReview, orderStatusUpdate } from "../api/allapi";
import dateFormat from "dateformat";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const OrderListComp = () => {
  const { user } = useAuth();

  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


   const[reviewORID,setReviewORID]=useState()

  const allorderapicall = async (token) => {
    const { data } = await allorderView(token);
    // console.log(data)

    setOrder(data);
  };

  const handleOrderUpdate = (order) => {
    setCurrentOrder(order);
    setSelectedStatus(order.delivery_status);
    setShowModal(true);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmitStatus = async () => {
    const data = await orderStatusUpdate(currentOrder, token, selectedStatus);

    if (data.status == "sucess") {
      setShowModal(false);
      toast.success(data.message);
      allorderapicall(token);
    }
  };




  // review
  const openModal = (id) => {
   setReviewORID(id)
// console.log("order id", id)
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setReviewText(""); 
  };



  const handleSubmitReview = async() => {


  // console.log(currentOrder)
    
    // console.log("Review Submitted:", reviewText);
    if(!reviewText){
    toast.error("Please write something")
    return
    
    }
 
    const body={
      "body": reviewText,
      "mango": reviewORID
    }
    // console.log(body)

     const data=await createReview(token,body)
    //  console.log(data)
     if (data.status=="sucess"){
     toast.success(data.message)
     
     }
     else if(data.status=="alreview"){
     toast.error(data.message)
     }
     else{
     toast.error("Review Failed")
     }


    setReviewText(""); 
    setIsModalOpen(false); 
  };


  useEffect(() => {
    allorderapicall(token);
  }, []);

  return (
    <div>
      <div>
        <div className="container my-4">
          <h2 className="text-center mb-4">Order List</h2>

          <div className="list-group">
            {order.length === 0 ? (
              <p className="text-center">No orders available.</p>
            ) : (
              order.map((order) => (
                <div key={order.id} className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>Order #{order.id}</h5>
                    <span
                      className={`badge ${
                        order.delivery_status === "Completed"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {order.delivery_status}
                    </span>
                    {user.account_type === "Buyer" ? (
                      <>
                        {order.delivery_status === "Completed" && (
                          <Link>
                            <button
                              type="button"
                              className="btn btn-primary"
                              
                              onClick={() => openModal(order.mango)}

                            >
                              Review Now
                            </button>
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        {order.delivery_status !== "Completed" && (
                          <button
                            onClick={() => handleOrderUpdate(order)}
                            className="btn btn-danger"
                          >
                            Update Now
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Mango ID :</strong> {order.mango}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Quantity:</strong> {order.quantity}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>User ID:</strong> {order.user}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Order Date:</strong>{" "}
                          {dateFormat(order.order_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showModal && (
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: "block" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Order Status Update
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="statusSelect">Select Order Status</label>
                    <select
                      id="statusSelect"
                      className="form-control"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancel">Cancel</option>
                      <option value="Delete">Delete</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitStatus}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Write a Review</h1>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="reviewText" className="form-label">
                      Your Review
                    </label>
                    <textarea
                      id="reviewText"
                      className="form-control"
                      rows="4"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review here..."
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
        )}
      </div>
    </div>
  );
};
