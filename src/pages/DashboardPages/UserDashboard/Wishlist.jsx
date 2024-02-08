
import WishlistCard from '../../../components/Cards/WishlistCard';
import useAuth from '../../../hooks/useAuth';
import useWishlistByEmail from '../../../hooks/useWishlistByEmail';
import HeaderText from './../../../components/HeaderText/HeaderText';
import { TbMoodEmpty } from "react-icons/tb";

const Wishlist = () => {
    const {user} = useAuth()
    const [wishlistDataByEmail,refetch] = useWishlistByEmail(user?.email)
    console.log(wishlistDataByEmail);
    return (
        <div className="min-h-screen  pb-20 md:pt-6">
            <HeaderText headerText='My Wishlists' headerText3='offer / remove from here'/>
            <h2 className='text-xl font-semibold text-center'>{wishlistDataByEmail.length === 0 ? <span><TbMoodEmpty className="inline text-3xl mr-2" />
 You have nothing in the wishlist</span>: ""}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 p-6'>
                {
                  wishlistDataByEmail?.map(wishlist=><WishlistCard key={wishlist._id} wishlist={wishlist} refetch={refetch}></WishlistCard>)  
                }

            </div>
        </div>
    );
};

export default Wishlist;