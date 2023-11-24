import Accordion from "../../components/Accordion/Accordion";

const Home = () => {
  return (
    <>
      <div>
        <h1 className="transition duration-300 ease-in-out hover:scale-95 text-xl">
          Home Sweet Home
        </h1>
      </div>
      <div>
        <Accordion />
        <button
          className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
          href="/download"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default Home;
