import { useData } from "../../context/DataContext";
import { useState } from "react";
import Button from "../../components/common/Button";
import "../../styles/contact.css";

function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { addMessage } = useData();


  const handleSubmit = e => {
  e.preventDefault();
 
  addMessage({
    name: form.fullname,
    email: form.email,
    phone: form.phone,
    subject: form.subject,
    department: form.department,
    message: form.message,
  });
 
  setSubmitted(true);
  setTimeout(() => setSubmitted(false), 4000);
  setForm({ fullname: "", email: "", phone: "", subject: "", department: "", message: "" });
};
 

  const faqs = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "Visit the scholarship page, select a scholarship and complete the application form.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer:
        "Yes, provided you meet the eligibility requirements for each scholarship.",
    },
    {
      question: "When are results announced?",
      answer:
        "Applicants are notified via email after the review process is completed.",
    },
    {
      question: "How can I become a donor?",
      answer:
        "Visit the donor section or contact our partnership team.",
    },
  ];

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <span className="contact-tag">
            Contact AIF Initiative
          </span>

          <h1>
            We're Here To Help You
          </h1>

          <p>
            Reach out for scholarship support,
            partnerships, donations, volunteering,
            and general enquiries.
          </p>
        </div>
      </section>

      <section className="contact-cards-section">
  <div className="container contact-cards">

    <div className="contact-card">
      <h3>Scholarship Support</h3>
      <p>adesanyaimpactfoundation@gmail.com</p>
    </div>

    <div className="contact-card">
      <h3>Applications</h3>
      <p>adesanyaimpactfoundation@gmail.com</p>
    </div>

    <div className="contact-card">
      <h3>Partnerships</h3>
      <p>adesanyaimpactfoundation@gmail.com</p>
    </div>

   
  </div>
</section>

      {/* CONTACT FORM */}

      <section className="contact-form-section">
  <div className="container">

    <div className="contact-form-card">

      <h2>Send Us A Message</h2>

      <form className="contact-form">

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="tel"
          placeholder="Phone Number"
        />

        <select>
          <option>Scholarship</option>
          <option>Applications</option>
          <option>Partnership</option>
          <option>General</option>
        </select>

        <input
          type="text"
          placeholder="Subject"
        />

        <textarea
          rows="6"
          placeholder="Your Message"
        ></textarea>

        <Button
          variant="secondary"
          size="lg"
        >
          Send Message
        </Button>

      </form>

    </div>
  </div>
</section>

      {/* TEAM MEMBERS */}

      <section className="team-section">
  <div className="container">

    <h2>Key Personnel</h2>

    <div className="team-grid">

      <div className="team-card">
        <h3>Sarah Johnson</h3>
        <span>Scholarship Coordinator</span>
        <p>scholarships@aifinitiative.org</p>
      </div>

      <div className="team-card">
        <h3>David Okeke</h3>
        <span>Applications Officer</span>
        <p>applications@aifinitiative.org</p>
      </div>

      <div className="team-card">
        <h3>Amina Yusuf</h3>
        <span>Partnership Manager</span>
        <p>partners@aifinitiative.org</p>
      </div>

    </div>

  </div>
</section>

      {/* OFFICE INFORMATION */}

      {/* FAQ */}

      <section className="faq-section">
  <div className="container">

    <h2>Frequently Asked Questions</h2>

    {faqs.map((faq, index) => (
      <div
        key={index}
        className="faq-item"
      >
        <button
          className="faq-question"
          onClick={() =>
            setActiveFaq(
              activeFaq === index
                ? null
                : index
            )
          }
        >
          {faq.question}
        </button>

        {activeFaq === index && (
          <div className="faq-answer">
            {faq.answer}
          </div>
        )}
      </div>
    ))}

  </div>
</section>

      {/* WHATSAPP CTA */}

      <section className="contact-cta">
  <div className="container">

    <h2>
      Need Immediate Assistance?
    </h2>

    <p>
      Chat directly with our support team.
    </p>

    <a
      href="https://wa.me/message/ECQLSIISJASKA1"
      target="_blank"
      rel="noreferrer"
    >
      <Button
        variant="secondary"
        size="lg"
      >
        Chat On WhatsApp
      </Button>
    </a>

  </div>
</section>

    </div>
  );
}

export default Contact;