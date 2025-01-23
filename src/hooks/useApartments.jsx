import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useApartments = (minimum,maximum,pageNumber,setTotalPageNumber) => {
    const { data: apartments = [], isLoading } = useQuery({
        queryKey: ['apartments', minimum, maximum, pageNumber],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/apartments?minimum=${minimum}&maximum=${maximum}&limit=${6}&page=${pageNumber}`);
            setTotalPageNumber(data?.totalPages);
            return data;
        }
    })
    console.log(apartments);
    return {apartments,isLoading};
};

export default useApartments;