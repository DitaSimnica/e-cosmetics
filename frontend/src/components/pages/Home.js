import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import '../Home.css';

const Home = () => {
  const features = [
    { icon: '🌷', text: 'Handpicked Korean skincare & makeup' },
    { icon: '🎁', text: 'Cute packaging with every order' },
    { icon: '💌', text: 'Personalized beauty recommendations' }
  ];

  const bestSellers = [
    {
      img: "/images/vitc.jpg",
      title: "Dewy Glow Serum",
      desc: "Hydrate and glow all day 🌸"
    },
    {
      img: "/images/fenty.jpg",
      title: "Fluffy Tint Lip Balm",
      desc: "Soft, glossy lips 💋"
    },
    {
      img: "/images/toner.jpg",
      title: "Cherry Cream",
      desc: "Brightens and refreshes 🌼"
    }
  ];

  return (
    <div className="home">

      {/* 🌸 Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Welcome to E-Cosmetics</h1>
          <p>Your beauty, your rules — all in one adorable place 💖</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
          </div>
        </div>
      </section>

      {/* ✨ Features Section */}
      <section className="features-section">
  <div className="container">
    <h2>Why You'll Love Us</h2>
    <div className="row mt-4 text-center">
      {features.map(({ icon, text }, idx) => (
        <div
          key={idx}
          className="col-md-4 feature-item p-3 fade-in-up"
          style={{ animationDelay: `${idx * 0.3 + 0.3}s` }} // stagger delay here
        >
          <div className="feature-icon" aria-label={text} role="img">{icon}</div>
          <p>{text}</p>
        </div>
      ))}
    </div>
  </div>
</section>


 {/* 🌟 Best Sellers Section */}
<section className="bestsellers-section">
  <div className="container text-center">
    <h2 className="bestsellers-title"> Our Best Sellers </h2>
    <div className="row justify-content-center gx-4 gy-5">
      {bestSellers.map((item, idx) => (
        <div className="col-sm-6 col-md-4" key={idx}>
          <div className="card best-seller-card fade-in-up" style={{ animationDelay: `${idx * 0.3}s` }}>
            <div className="image-wrapper">
              <img src={item.img} alt={item.title} className="best-seller-img" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* 💖 Image Slider Section */}
      <section className="slider-section">
        <div className="container">
          <div id="beautyCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded-4 shadow-lg">
              <div className="carousel-item active">
                <img src="/images/1.jpg" className="d-block w-100 slider-img" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src="/images/2.jpg" className="d-block w-100 slider-img" alt="Slide 2" />
              </div>
              <div className="carousel-item">
                <img src="/images/3.jpg" className="d-block w-100 slider-img" alt="Slide 3" />
              </div>
              <div className="carousel-item">
                <img src="/images/4.jpg" className="d-block w-100 slider-img" alt="Slide 4" />
              </div>
              <div className="carousel-item">
                <img src="/images/5.jpg" className="d-block w-100 slider-img" alt="Slide 5" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#beautyCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#beautyCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* 💕 About Section */}
<section className="about-section">
  <div className="container text-center">
    <div className="about-icon" aria-hidden="true">🌸</div>
    <h2>About Us</h2>
    <p className="about-text">
      We’re a small team of beauty lovers committed to bringing you the most effective and adorable products.<br />
      Our mission is to make skincare fun, affordable, and confidence-boosting 🌼
    </p>
    {/* Optional: */}
    {/* <Link to="/about" className="btn btn-about">Learn Our Story</Link> */}
  </div>
</section>


      {/* 🌸 Footer Section */}
      <footer className="footer-section">
  <div className="container text-center">
    <div className="social-icons">
      <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram />
      </a>
      <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebookF />
      </a>
      <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FaTwitter />
      </a>
    </div>
    <p className="footer-text">
      © {new Date().getFullYear()} E-Cosmetics. Made with 💖 for beauty lovers.
    </p>
  </div>
</footer>

    </div>
  );
};

export default Home;
