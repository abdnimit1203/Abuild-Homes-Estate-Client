import { FaArrowAltCircleRight, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerbg from "/assets/other/footerbg.png"



const Footer = () => {
  const isdark=JSON.parse(localStorage.getItem("isdark"))
  // console.log(isdark);
  return (
    <footer className={` bg-bottom bg-repeat `} style={{backgroundImage: `url(${footerbg})`}}>

    <div className="border-t-2 mt-4 footer p-10   text-neutral gap-6 w-[90%] mx-auto justify-between  ">
      <nav className="md:w-[80%]">
        {
          isdark?
          <img src="/assets/home/logoDark.png" alt="darkLogo" className="w-40 rounded-3xl" />:
          <img src="/assets/home/logoMain.png" alt="logo" className="w-40 rounded-3xl" />

        }
       {/* <img className="bg-cover bg-center" src={`${footerbg}`} alt="sa" /> */}
      <p className="max-w-xs">Where your dreams find their address, and every door opens to endless possibilities.</p>
      <p >Mail: <span className="text-primary">abuild@estate.com</span></p>
      <p>Phone: +880 1622 3121</p>
        <div className="grid grid-cols-5 text-xl gap-4 py-4 bg-base-100 rounded-xl">
            <FaFacebook className="hover:scale-150 transition duration-200 cursor-pointer text-blue-500"/>
            <FaTwitter className="hover:scale-150 transition duration-200 cursor-pointer text-sky-400"/>
            <FaInstagram className="hover:scale-150 transition duration-200 cursor-pointer text-rose-500"/>
            <FaLinkedin  className="hover:scale-150 transition duration-200 cursor-pointer text-sky-600"/>
           
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
      <form className="">
        <header className="footer-title">Subscribe</header>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              required
              placeholder="username@email.com"
              className="w-[50%] input input-bordered join-item"
            />
            <button className="btn btn-primary   text-white rounded-l-none rounded-r-xl"><FaArrowAltCircleRight/></button>
          </div>
        </fieldset>
      </form>
    
    </div>
    <p className="text-xs text-slate-400 bg-base-100  w-fit mx-auto col-span-5 text-center p-2 rounded-xl">© 2023 . All rights reserved. By <Link to={"https://github.com/abdnimit1203"}  target="_blank" className="text-primary">ABD NIMIT</Link></p>
    </footer>
  );
};

export default Footer;
