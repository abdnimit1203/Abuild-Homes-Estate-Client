// import { motion } from 'framer-motion';


const Rental = () => {
  return (
    <div className="flex flex-col justify-center  items-center py-10">
      <h2 className="text-xl lg:text-3xl font-semibold text-center">
        Facilitating Seamless Rentals for Residents and Property Managers
      </h2>
      <h4 className="text-lg lg:text-2xl py-2 text-center">
        Navigate the entire process effortlessly with the assistance of our
        articles, guides, and videos.
      </h4>
      <div className="grid grid-cols-1 py-10 glass rounded-2xl bg-base-100 my-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex-[50%] flex flex-col  justify-center p-10 gap-5 items-start">
            <p className="text-xl font-semibold">Rental Insights for Tenants</p>
            <p>
              Unlock solutions to all your renting queries through the ultimate
              guide for renters in the galaxy.
            </p>
            <button className="hover:scale-110 transition duration-150 text-primary text-xl font-semibold">Show Articles</button>
          </div>
          <div className="flex-[50%]">
            <img src="https://i.ibb.co/Yk7pCjt/houseforest.jpg" alt="home" className="aspect-video hover:scale-90 transition duration-150" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
        <div className="flex-[50%]">
            <img src="https://i.ibb.co/D5T8yRr/home004.jpg" alt="home" className="aspect-video hover:scale-95 transition duration-150" />
          </div>
          <div className="flex-[50%] flex flex-col  justify-center p-10 gap-5 items-start">
            <p className="text-xl font-semibold">Empower Your Property Management Journey</p>
            <p>
            Keep abreast of the latest trends and best practices with our insights and guides on topics such as rent payments, leasing strategies, management solutions, and beyond.
            </p>
            <button
             
            className="text-success  hover:scale-110 transition duration-150  text-xl font-semibold">Get Informed</button>
          </div>
         
        </div>
        <div className="flex flex-col md:flex-row">
       
          <div className="flex-[50%] flex flex-col  justify-center p-10 gap-5 items-start">
            <p className="text-xl font-semibold">Bring Abuild Homes Estate Wherever You Go</p>
            <p>
            Carry Abuild Homes Estate in the palm of your hand as your trusted companion on your rental journey. <br />
            COMING SOON.......
            </p>
            <div
             
            className="flex  justify-center items-center gap-2">
                <img src="https://i.ibb.co/p4khSnC/get-on-playstore.png" alt="playstore" className='  hover:scale-110 transition duration-150  text-xl w-32 lg:w-44 h-fit cursor-pointer' />
                <img src="https://i.ibb.co/3FKNkYB/getonapple.png" alt="apple"  className='  hover:scale-110 transition duration-150  text-xl w-32 lg:w-44 h-fit cursor-pointer'/>
            </div>
          </div>
          <div className="flex-[50%]">
            <img src="https://images.pexels.com/photos/887751/pexels-photo-887751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo by PhotoMIX Company from Pexels: https://www.pexels.com/photo/person-holding-silver-iphone-7-887751/" className="aspect-video hover:scale-95 transition duration-150 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rental;
