import HeaderText from "../../components/HeaderText/HeaderText";
import { motion } from "framer-motion";
import { ImPhone } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

const AboutUs = () => {
  return (
    <div>
      <HeaderText headerText="About Us" />
      <div>
        <motion.img
          src="https://i.ibb.co/crndkJx/prope2.jpg"
          alt="home"
          className="h-[200px] w-full object-cover rounded-2xl mb-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 60,
          }}
        />
        <motion.h2
          className="head-bold "
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 60,
          }}
        >
          Welcome to Abuild Homes Estate
        </motion.h2>
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 60 }}
        >
          At Abuild Homes Estate, we are dedicated to simplifying and enhancing
          your property buying and selling experience. With a passion for real
          estate and a commitment to excellence, we strive to be your trusted
          partner in every step of your property journey.
        </motion.p>
        <motion.h2
          className="head-bold border-b-4 w-fit mx-auto mb-10 border-b-primary text-center pt-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 60 }}
        >
          Our Mission
        </motion.h2>
        <p>
          Our mission is to empower individuals and families to find their dream
          homes and make seamless property transactions. We aim to provide a
          platform that combines innovation, reliability, and personalized
          service.
        </p>
        <motion.h2
          className="head-bold border-b-4 w-fit mx-auto mb-10 border-b-primary text-center pt-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 60 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center text-center gap-6 ">
          <motion.div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full">
            <span className="font-bold text-primary text-xl md:text-3xl pb-6">
              Expertise
            </span>
            <p>
              We believe in transparency at every stage. From property listings
              to transactions, we ensure clarity and openness to build trust
              with our clients
            </p>
          </motion.div>
          <motion.div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full">
            <span className="font-bold text-primary text-xl md:text-3xl pb-6">
              Transparency:
            </span>
            <p>
              Backed by a team of experienced real estate professionals, we
              bring in-depth industry knowledge to guide you through the
              complexities of property transactions.
            </p>
          </motion.div>
          <motion.div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full">
            <span className="font-bold text-primary text-xl md:text-3xl pb-6">
              Customer-Centric Approach:
            </span>
            <p>
              Your satisfaction is our priority. Our customer-centric approach
              means we listen to your needs and work tirelessly to meet and
              exceed your expectations.
            </p>
          </motion.div>
          <motion.div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full">
            <span className="font-bold text-primary text-xl md:text-3xl pb-6">
              Technology-Driven Solutions:
            </span>
            <p>
              Leveraging cutting-edge technology, we provide advanced tools like
              virtual tours, online property valuation, and more, ensuring a
              seamless and efficient experience.with our clients
            </p>
          </motion.div>
        </div>
      </div>

      <div className="min-h-screen bg ">
        <h2 className="head-bold border-b-4 border-primary w-fit mx-auto py-10">
          {" "}
          Contact Information
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 justify-center items-center text-center gap-x-10  py-20"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full relative gap-6 ">
            <span className="border-4 border-primary flex justify-center items-center text-3xl text-white bg-primary aspect-square  rounded-full absolute font-bold w-16 h-16 -top-10 left-[45%] md:left-[36%] lg:left-[40%]">
              <ImPhone />
            </span>
            <p className="text-xl text-neutral">Phone</p>
            <p className="text-xl ">+8801 1234 2113</p>
          </div>
          <div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full relative gap-6">
            <span className="border-4 border-primary flex justify-center items-center text-3xl text-white bg-primary aspect-square  rounded-full absolute font-bold w-16 h-16 -top-10 left-[45%] md:left-[36%] lg:left-[40%]  ">
              <MdEmail />
            </span>
            <p className="text-xl text-neutral">Email</p>
            <p className="text-xl ">abuild@estate.com</p>
          </div>
          <div className="flex flex-col p-6 md:p-10 border-4 rounded-xl border-b-8 border-y-primary transition duration-150 hover:scale-105 cursor-pointer h-full relative gap-6 ">
            <span className="border-4 border-primary flex justify-center items-center text-3xl text-white bg-primary aspect-square  rounded-full absolute font-bold w-16 h-16 -top-10 left-[45%] md:left-[36%] lg:left-[40%]">
              <GrMapLocation />
            </span>
            <p className="text-xl text-neutral">Location</p>
            <p className="text-xl ">New York, USA</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
