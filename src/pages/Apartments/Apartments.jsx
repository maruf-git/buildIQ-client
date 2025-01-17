import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container";
import axios from "axios";
import ApartmentCard from "../../components/Apartment/ApartmentCard";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Apartments = () => {
    const {user,role}=useContext(AuthContext);
    const { data: apartments = [], isLoading } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/apartments`);
            return data;
        }
    })
    console.log("apartment user:",user);

    console.log(apartments);
    console.log(role);
    return (
        <div className="my-10">
            <Container>
                <div className="grid grid-cols-3 gap-3">
                    {
                        apartments.map(apartment=><ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Apartments;