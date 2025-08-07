import React, { useRef } from "react";
import ContactForm from "../components/ContactForm";

const FeatureIcon = () => (
  <svg
    className="w-5 h-5 mr-3 text-green-400 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const TechIcon = () => (
  <svg
    className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    ></path>
  </svg>
);

const About = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 w-full pt-6 pb-8 px-4 text-white">
      <div className="text-center py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          About <span className="text-blue-400">FreshCart</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          FreshCart is a modern e-commerce web application built to showcase
          practical skills in creating dynamic, responsive, and user-friendly
          online shopping experiences using React and Firebase.
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-[#0f172a] rounded-xl shadow-lg p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-500 pb-2">
              Key Features
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FeatureIcon />
                <span>
                  User Authentication: Secure sign-up and login with Email &
                  Google.
                </span>
              </li>
              <li className="flex items-start">
                <FeatureIcon />
                <span>
                  Dynamic Product Catalog: Real-time products from a Firestore
                  database.
                </span>
              </li>
              <li className="flex items-start">
                <FeatureIcon />
                <span>
                  Advanced Filtering & Search: Live search and filter by
                  category, price, and rating.
                </span>
              </li>
              <li className="flex items-start">
                <FeatureIcon />
                <span>
                  Interactive Shopping Cart: Add, remove, and view items with
                  real-time updates.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-blue-500 pb-2">
              Tech Stack
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <TechIcon />
                <span>
                  Frontend: React, React Router, and Tailwind CSS for a
                  responsive design.
                </span>
              </li>
              <li className="flex items-start">
                <TechIcon />
                <span>
                  Backend & Database: Firebase Authentication and Firestore.
                </span>
              </li>
              <li className="flex items-start">
                <TechIcon />
                <span>
                  Notifications: User-friendly alerts using React Toastify.
                </span>
              </li>
              <li className="flex items-start">
                <TechIcon />
                <span>
                  Contact Form: Integrated with EmailJS for seamless
                  communication.
                </span>
              </li>
            </ul>
          </section>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={scrollToContact}
            className="inline-block rounded-md bg-green-700 hover:bg-green-800 font-bold px-8 py-3 transition duration-300 text-lg"
            aria-label="Scroll to Contact Us section"
          >
            Contact Me
          </button>
        </div>
      </div>

      <section
        ref={contactRef}
        className="max-w-3xl mx-auto py-20 mt-12"
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="text-3xl font-bold mb-4 text-center"
        >
          📬 Get In Touch
        </h2>
        <p className="text-gray-400 mb-10 text-center max-w-xl mx-auto">
          Have a question, feedback, or a suggestion? Feel free to reach out!
        </p>
        <ContactForm />
      </section>
    </div>
  );
};

export default About;
