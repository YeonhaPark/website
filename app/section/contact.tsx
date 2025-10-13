"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [name]: value });
  };
  // service_titicdl
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    try {
      setLoading(true);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          name: form.name,
          message: form.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
        }
      );
      alert("Thank you. I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="c-space my-20"
      id="contact"
      style={{ scrollMarginTop: "100px" }}
    >
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <Image
          src="/assets/terminal.png"
          alt="terminal"
          fill
          className="absolute inset-0 min-h-screen"
        />
        <div className="contact-container">
          <h3 className="head-text">Let&apos;s talk</h3>
          <p className="sm:text-lg text-white-600">
            {" "}
            I&apos;m currently open to new opportunities and collaborations.
            Whether you have a project in mind or just want to say hello, feel
            free to reach out!
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col space-y-7 mt-12"
          >
            <label htmlFor="name" className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
              />
            </label>
            <label htmlFor="email" className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
              />
            </label>
            <label htmlFor="name" className="space-y-3">
              <span className="field-label">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
              />
            </label>
            <button className="field-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
              <Image
                src="/assets/arrow-up.png"
                alt="arrow"
                className="field-btn_arrow"
                width={12}
                height={12}
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
