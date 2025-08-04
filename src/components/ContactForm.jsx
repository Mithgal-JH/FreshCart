import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const now = new Date().toLocaleString();
    setCurrentTime(now);

    setTimeout(() => {
      emailjs
        .sendForm(
          "service_mkjkjgn",
          "template_r8s7aas",
          form.current,
          "stigiQgfgyV44yIfj"
        )
        .then(
          (result) => {
            setStatusMessage("✅ Message sent successfully!");
            e.target.reset();
            setCurrentTime("");
          },
          (error) => {
            setStatusMessage("❌ Failed to send message: " + error.text);
          }
        );
    }, 100);
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="space-y-6 bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-md"
    >
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Your Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Message
        </label>
        <textarea
          name="message"
          rows="4"
          required
          className="w-full px-4 py-2 rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message..."
        ></textarea>
      </div>

      <input type="hidden" name="time" value={currentTime} readOnly />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
      >
        Send Message
      </button>

      {statusMessage && (
        <p className="mt-4 text-center text-sm text-white">{statusMessage}</p>
      )}
    </form>
  );
};

export default ContactForm;
