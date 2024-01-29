import axios from "axios";


const axiosHandle = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosHandle = () => {
    return axiosHandle
};

export default useAxiosHandle;