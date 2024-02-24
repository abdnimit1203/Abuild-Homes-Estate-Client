import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://abuild-homes-estate-server-2.onrender.com'
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;