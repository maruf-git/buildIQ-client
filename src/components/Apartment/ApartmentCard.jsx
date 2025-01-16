/* eslint-disable react/prop-types */


const ApartmentCard = ({ apartment }) => {
    const { apartment_image, apartment_no, floor_no, block_no, rent, booking_status } = apartment;
    return (

        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <img
                    className="w-full h-[250px] object-cover"
                    src={apartment_image}
                    alt="apartment_image" />
            </figure>
            <div className="card-body flex-col gap-0">
                <h2 className="card-title">Rent: {rent}$</h2>
                <h2 className="card-title">Apartment No: {apartment_no}</h2>
                <p className="card-title mr-0 pr-0">{block_no}, Floor: {floor_no}</p>
                {/* agreement button */}
                <div className="card-actions w-full mt-2">
                    <button className="btn btn-primary w-full">Request Agreement</button>
                </div>
            </div>
        </div>

    );
};

export default ApartmentCard;