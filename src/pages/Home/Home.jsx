import Banner from "../../components/Home/Banner";
import Container from "../../components/shared/Container";

const Home = () => {
    return (
        <div>
            {/* banner section */}
            <section className="mt-5 mb-10">
                <Container>
                    <Banner></Banner>
                </Container>
            </section>

        </div>
    );
};

export default Home;