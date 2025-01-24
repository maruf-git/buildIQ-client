import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const useMyApartmentInfo = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();
    const { data: myApartment = [], isLoading,refetch } = useQuery({
        queryKey: ['my-apartment'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`my-apartment/${user?.email}`);
            return data;
        }
    })
    return {myApartment,isLoading,refetch}
};

export default useMyApartmentInfo;