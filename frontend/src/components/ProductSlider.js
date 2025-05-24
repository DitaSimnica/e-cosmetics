import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css';
import './ProductSlider.css';

const products = [
  {
    id: 1,
    name: "Rose Glow Serum",
    image: "/images/pic1.jpg",
  },
  {
    id: 2,
    name: "Honey Glow Mask",
    image: "/images/pic3.jpg",
  },
  {
    id: 3,
    name: "Vitamin C Serum",
    image: "/images/pic2.jpg",
  },
  {
    id: 4,
    name: "Snail Repair Cream",
    image: "/images/pic4.jpg",
  },
  {
    id: 5,
    name: "Heartleaf Toner Pad",
    image: "/images/pic5.jpg",
  },
];

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-slider animate__animated animate__fadeInUp">
      <h2>Our Featured Products</h2>
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
