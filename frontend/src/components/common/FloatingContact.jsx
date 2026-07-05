import { useState } from "react";
import {
  FiMessageCircle,
  FiX,
  FiMail,
  FiPhone,
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import { Link } from "react-router-dom";

import "../../styles/floatingContact.css";
import { useLocation } from "react-router-dom";

function FloatingContact() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

if (location.pathname.startsWith("/admin")) {
  return null;
}

  return (
    <>
      <button
        className="floating-contact-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>

      {open && (
        <div className="floating-contact-box">

          <div className="floating-header">
            <h3>AIF Support</h3>

            <p>
              How can we help you today?
            </p>
          </div>

          <a
            href="https://wa.me/message/ECQLSIISJASKA1"
            target="_blank"
            rel="noreferrer"
            className="contact-option whatsapp"
          >
            <FaWhatsapp />
            <div>
              <h4>WhatsApp</h4>
              <span>Chat with support</span>
            </div>
          </a>

          <a
            href="mailto:adesanyaimpactfoundation@gmail.com"
            className="contact-option"
          >
            <FiMail />
            <div>
              <h4>Email</h4>
              <span>adesanyaimpactfoundation@gmail.com</span>
            </div>
          </a>

          <a
            href="tel:+2348000000000"
            className="contact-option"
          >
            <FiPhone />
            <div>
              <h4>Call Support</h4>
              <span>Mon - Fri</span>
            </div>
          </a>

          <Link
            to="/contact"
            className="contact-option"
          >
            <FiMessageCircle />
            <div>
              <h4>Contact Page</h4>
              <span>More contact options</span>
            </div>
          </Link>

        </div>
      )}
    </>
  );
}

export default FloatingContact;