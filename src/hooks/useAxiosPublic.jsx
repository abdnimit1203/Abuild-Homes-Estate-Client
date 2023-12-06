import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://abuild-homes-estates-server.vercel.app",
})
const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;
