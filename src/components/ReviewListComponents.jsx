import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewByManId } from "../api/allapi";
import dateFormat from "dateformat";

export const ReviewListComponents = () => {
  const [review, setReview] = useState([]);

  const { id } = useParams();

  const mangoReviewAPI = async (id) => {
    const { data } = await reviewByManId(id);
    setReview(data);
    // console.log(data);
  };

  useEffect(() => {
    mangoReviewAPI(id);
  }, []);

  const crdimg = {
    width: "40px",
    height: "40px",
  };

  return (
    <div>
      <div>
        <div className="list-group">
          {!review || review.length == 0 ? (
            <>
              <h5>No review Found</h5>
            </>
          ) : (
            <>


<div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {review.map((iteams, index) => (
          <div
            key={iteams.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <div className="d-flex justify-content-center">
              <div className="card" style={{ width: '18rem' }}>
                <img className="align-center" style={{ width: '40px' ,height:'40px'}} src="https://i.ibb.co.com/HLZNLpY/download.png" alt="Review" />
                <div className="card-body">
                  <h5 className="card-title">{iteams.reviewer}</h5>
                  <p className="card-text">{iteams.body}</p>
                  <p className="card-text">
                    <small className="text-muted">{dateFormat(iteams.created_at)}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#reviewCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#reviewCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
</div>




             
              
              
            </>
          )}

        </div>
      </div>
    </div>
  );
};
