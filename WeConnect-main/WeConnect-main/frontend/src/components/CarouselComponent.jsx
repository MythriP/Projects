import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Loader from "./Loader";

const CarouselComponent = ({ media }) => {
  return media ? (
    <Carousel
      className="carousel"
      autoPlay
      infiniteLoop
      interval={2000}
      emulateTouch
      showThumbs={false}
      dynamicHeight={true}
    >
      {media.map((item) => (
        <div key={item.id}>
          {item.type === "image" && <img src={item.media_url} alt={item.id} />}
          {item.type === "doc" && (
            <iframe
              src={item.media_url}
              title={item.id}
              style={{ height: "400px" }}
              frameBorder="0"
            />
          )}
          {item.type === "video" && (
            <video style={{ width: "100%", height: "1000" }} controls autoPlay>
              <source src={item.media_url} type="video/mp4" />
            </video>
          )}
        </div>
      ))}
    </Carousel>
  ) : (
    <Loader />
  );
};

export default CarouselComponent;
