

const ApartmentCard = ({ apartment }) => {
    const { apartment_image, apartment_no, floor_no, block, rent, booking_status } = apartment;
    return (

        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <img
                    src={apartment_image}
                    alt="apartment_image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>

    );
};

export default ApartmentCard;