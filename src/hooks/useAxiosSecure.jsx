import axios from "axios";


const axiosSecure = axios.create({
    baseURL: 'https://abuild-homes-estates-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;