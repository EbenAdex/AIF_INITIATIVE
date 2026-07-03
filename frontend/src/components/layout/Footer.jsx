import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import "../../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* TOP NEWSLETTER */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h2>Stay Updated with News about us</h2>

            <p>
              Get the latest updates on our scholarship initiatives and impact.
            </p>

            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
              />

              <div className="checkbox-wrapper">
                <input type="checkbox" id="agree" />

                <label htmlFor="agree">
                  I agree to receive notifications, updates, publications,
                  alerts, and newsletters from AIF Initiative.
                </label>
              </div>

              <small>
                You may unsubscribe at any time using the link in our newsletter.
              </small>

              <button type="submit">
                Subscribe me
              </button>
            </form>
          </div>

          {/* SOCIALS */}
          <div className="footer-socials">
            <a href="/">
              <FaInstagram />
            </a>

            <a href="/">
              <FaLinkedinIn />
            </a>

            <a href="/">
              <FaFacebookF />
            </a>

            <a href="/">
              <FaTwitter />
            </a>

            <a href="/">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="footer-middle">
          {/* LEFT */}
          <div className="footer-brand">
            <h1>AIF</h1>

            <p>
              AIF Initiative is a humanitarian foundation dedicated to
              creating lasting impact through education, healthcare support,
              community development, humanitarian outreach, youth empowerment,
              and sustainable initiatives that improve lives and inspire hope
              across communities.
            </p>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <h3>Get In Touch</h3>

            <p>Lagos, Nigeria</p>
            <p>info@aifinitiative.org</p>
            <p>+234 812 000 0000</p>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <a href="/">Scholarship</a>
            <a href="/">Leadership</a>
            <a href="/">Events</a>
            <a href="/">Donors</a>
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h3>Company</h3>

            <a href="/">About Us</a>
            <a href="/">Meet the Team</a>
            <a href="/">Contact Us</a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>
            © {currentYear} AIF Initiative. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;