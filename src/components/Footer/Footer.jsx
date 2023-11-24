import { FaArrowAltCircleRight, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";




const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-100 text-neutral gap-6">
      <nav className="md:w-[80%]">
      <img src="/assets/home/logoMain.png" alt="logo" className="w-40 rounded-3xl" />
      <p className="max-w-xs">Where your dreams find their address, and every door opens to endless possibilities.</p>
        <div className="grid grid-cols-5 text-xl gap-4 py-4">
            <FaFacebook className="hover:scale-150 transition duration-200 cursor-pointer text-blue-500"/>
            <FaTwitter className="hover:scale-150 transition duration-200 cursor-pointer text-sky-400"/>
            <FaInstagram className="hover:scale-150 transition duration-200 cursor-pointer text-rose-500"/>
            <FaLinkedin  className="hover:scale-150 transition duration-200 cursor-pointer text-sky-600"/>
            <p className="text-xs text-slate-400 col-span-5">© 2023 . All rights reserved. By <Link to={"https://github.com/abdnimit1203"}  target="_blank" className="text-primary">ABD NIMIT</Link></p>
        </div>
      </nav>
      <nav>
        <header className="footer-title">Our Company</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <header className="footer-title">Subscribe</header>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="email@site.com"
              className="w-[50%] input input-bordered join-item"
            />
            <button className="btn btn-primary   text-white rounded-l-none rounded-r-xl"><FaArrowAltCircleRight/></button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
