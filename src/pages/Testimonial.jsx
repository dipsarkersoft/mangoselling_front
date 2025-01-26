import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

const reviews = [
  { id: 1, reviewer: "John Doe", body: "Great product, I love it!", created_at: "2025-01-20", image: "https://i.ibb.co.com/cXrFYDm/gettyimages-1179420343-612x612.jpg" },
  { id: 2, reviewer: "Jane Smith", body: "Amazing quality, highly recommend!", created_at: "2025-01-22", image: "https://i.ibb.co.com/1R3vfbM/gettyimages-1250238624-612x612.jpg" },
  { id: 3, reviewer: "Samuel Lee", body: "Will definitely buy again.", created_at: "2025-01-23", image: "https://i.ibb.co.com/42jx5Gn/gettyimages-1334476544-612x612.jpg" },
  { id: 4, reviewer: "Mike Johnson", body: "Fast delivery, excellent product!", created_at: "2025-01-24", image: "https://i.ibb.co.com/7rqP4sM/gettyimages-1454056104-612x612.jpg" },
  { id: 5, reviewer: "Emily Davis", body: "Very satisfied with my purchase.", created_at: "2025-01-25", image: "https://i.ibb.co.com/dG9cCtr/gettyimages-82590167-612x612.jpg" },
  { id: 6, reviewer: "Chris Lee", body: "Good value for the price.", created_at: "2025-01-26", image: "https://i.ibb.co.com/K9tCDDN/gettyimages-669888024-612x612.jpg" }
];

export const Testimonial = () => {
  return (
    <div>

<div className="container mt-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <Swiper
        spaceBetween={10} // space between slides
        slidesPerView={3} // 3 items per slide
        loop={true} // loop the carousel
        navigation={true} // enable navigation buttons
        breakpoints={{
          640: {
            slidesPerView: 1, 
          },
          768: {
            slidesPerView: 3, 
          },
        }}
      >
         {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="card text-center caroselca">
              <img  src={review.image} className="card-img-top" alt={review.reviewer} />
              <div className="card-body">
                <h5 className="card-title">{review.reviewer}</h5>
                <p className="card-text">{review.body}</p>
                <p className="card-text">
                  <small className="text-muted">{new Date(review.created_at).toLocaleDateString()}</small>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>



    </div>
  )
}
