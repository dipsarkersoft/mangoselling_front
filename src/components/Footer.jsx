import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are dedicated to bringing you the best mangoes from the tropics.
              Enjoy the freshest, ripest, and juiciest mangoes delivered right to your door.
            </p>
          </div>

          
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Email:</strong> sarkerdip005@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +8801303053626
              </li>
              <li>
                <strong>Address:</strong>  Rajsshahi, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled gap-2 d-flex">
              <li className="mr-3">
                <a
                  href="https://facebook.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={24} />
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="https://instagram.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="https://twitter.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row mt-4">
          <div className="col text-center">
            <p>&copy; 2025 Mango Website. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
