import React from "react";
import Navbar from "@/components/Navbar";
import FeedbackForm from "@/components/FeedbackForm";
import Footer from "@/components/Footer";
import "@/styles/Feedback.css";

export default function FeedbackPage() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="feedback-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12 text-center">
              <h1 className="feedback-title">
                <span className="gradient-text">Feedback</span> 199S Studio
              </h1>
              <p className="feedback-subtitle">
                Chia sẻ trải nghiệm của bạn để chúng tôi có thể cải thiện dịch
                vụ tốt hơn
              </p>
              <div className="feedback-decoration">
                <div className="decoration-line"></div>
                <i className="bi bi-heart-fill"></i>
                <div className="decoration-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="feedback-form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
