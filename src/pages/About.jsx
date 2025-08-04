import React, { useRef } from "react";
import ContactForm from "../components/ContactForm";

const About = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#1E2A78] min-h-screen w-screen pt-28 pb-8 px-8 text-white">
      <div className="bg-[#2C3E91] rounded-xl shadow-lg py-8 px-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About This Project</h1>
        <p className="mb-4 leading-relaxed">
          This project was built as a personal learning journey to understand
          and practice React. I developed it to explore the fundamentals of
          component-based architecture, routing, state management, and modern UI
          design with Tailwind CSS.
        </p>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">The app includes:</h2>
          <ul className="list-disc list-inside ml-5 space-y-1">
            <li>User authentication (Login/Register)</li>
            <li>Home page that displays products</li>
            <li>Cart page to manage selected products</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">Tools & Technologies used:</h2>
          <ul className="list-disc list-inside ml-5 space-y-1">
            <li>React (frontend & routing)</li>
            <li>Tailwind CSS (styling)</li>
            <li>HTML (structure and base)</li>
            <li>
              Firebase (planned) – backend services like auth and database
            </li>
          </ul>
        </section>

        <p className="mb-6">
          This project is not a commercial app but a practical learning tool to
          deepen my understanding of modern web development.
        </p>

        <button
          onClick={scrollToContact}
          className="inline-block rounded-md bg-green-700 hover:bg-green-800 font-bold px-6 py-3 transition duration-300"
          aria-label="Scroll to Contact Us section"
        >
          Contact Us
        </button>
      </div>

      <section
        ref={contactRef}
        className="max-w-3xl mx-auto py-20 px-4 min-h-screen w-full"
        aria-labelledby="contact-heading"
      >
        <h1
          id="contact-heading"
          className="text-3xl font-bold mb-6 text-center"
        >
          📬 Contact Us
        </h1>
        <p className="text-gray-200 mb-10 text-center max-w-xl mx-auto">
          If you have any questions, feedback, or suggestions — feel free to
          reach out!
        </p>

        <ContactForm />
      </section>
    </div>
  );
};

export default About;
