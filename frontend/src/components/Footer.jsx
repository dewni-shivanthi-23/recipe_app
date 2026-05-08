// const Footer = () => {
//   return (
//     <footer className="bg-amber-600 text-white text-center py-6 mt-10">
//       <p className="text-sm">
//         © {new Date().getFullYear()} RecipeVault. All rights reserved.
//       </p>
//       <div className="mt-2 space-x-4">
//         <a href="#" className="hover:underline">
//           Privacy Policy
//         </a>
//         <a href="#" className="hover:underline">
//           Terms
//         </a>
//         <a href="#" className="hover:underline">
//           Contact
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Section */}
        <div className="flex justify-between items-start space-x-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-amber-600">RecipeVault</h2>
            <p>
              RecipeVault is a recipe website with a wide variety of delicious
              recipes, easy-to-use search function. Join our community and let's
              cook together!
            </p>
          </div>

          {/* Middle Column: Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Explore</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Activity</a>
              </li>
            </ul>
          </div>

          {/* Right Column: Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Use Cases</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Insights</a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Subscribe</h3>
            <p className="text-sm">
              Get the latest recipes, tips, and updates directly to your inbox!
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 text-white-900 rounded-l"
              />
              <button className="bg-amber-600 text-white px-4 py-2 rounded-r">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="text-xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl">
            <FaLinkedin />
          </a>
          <a href="#" className="text-xl">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
