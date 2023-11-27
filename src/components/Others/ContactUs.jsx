
import TypeWriterEffect from "react-typewriter-effect";
const ContactUs = () => {
    return (
        <div
        className="hero rounded-2xl w-[100%] justify-start min-h-[400px] text-white"
        style={{ backgroundImage: "url(/assets/home/contact-home.jpg)" }}
      >
        <div className="hero-overlay rounded-l-2xl bg-opacity-50 bg-[#000000] "></div>
        <div className="hero-content  text-left ">
          <div className="md:py-10 pl-10 ">
           <div className="max-w-md ">
  
            <h2 className=" text-4xl leading-normal font-bold">
            Find your best <br />Real Estate
            </h2>
            <h3  className="mb-5 text-lg  py-6">

            <TypeWriterEffect
                startDelay={1000}
                cursorColor="#3F3D56"
                multiText={[
                  "We provide a complete service for the sale, purchase or rental of real estate",
                  "Contact ABuild Homes Estates for Unparalleled Service and Unmatched Expertise.",
            
                ]}
                multiTextDelay={2000}
                multiTextLoop
                typeSpeed={30}
              />
            </h3>
            
           </div>
            <button className="button button-2 px-4 py-2">CONTACT US</button>
          </div>
        </div>
      </div>
    );
};

export default ContactUs;