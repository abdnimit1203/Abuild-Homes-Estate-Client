import HeaderText from "../../components/HeaderText/HeaderText";
import { motion } from "framer-motion";

const Career = () => {
  return (
    <div>
      <HeaderText headerText="Career" />

      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse justify-between">
          <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
            drag
            dragConstraints={{
              top: -20,
              left: -20,
              right: 20,
              bottom: 20,
            }}
            src="https://i.ibb.co/y0jSdH5/career.png"
            className="max-w-[20%] rounded-lg shadow-2xl shadow-blue-400"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="max-w-[50%]"
          >
            <h1 className="text-5xl font-bold">Job Openings</h1>
            <p className="py-6">
              Welcome to Abuild Homes Careers,
              <br />
              <br />
              At Abuild Homes Careers, we believe in fostering a culture of
              innovation, creativity, and collaboration. Our team is comprised
              of talented individuals who are passionate about making a
              difference and pushing the boundaries of whats possible. <br />
              <br />
              Joining our team means being part of a dynamic and diverse
              community that values individual perspectives and encourages
              professional growth. We are committed to creating an inclusive
              workplace where everyone feels empowered to contribute their
              unique skills and ideas.
            </p>
            <button className="button-2 p-2">Apply now!</button>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="py-6 flex flex-col items-center gap-6"
      >
        <h2 className="text-2xl font-bold border-b-4 border-b-primary">Jobs</h2>
       <p className="h-52 text-center py-auto">Opps! there are currently no job openings</p>
      </motion.div>
    </div>
  );
};

export default Career;
