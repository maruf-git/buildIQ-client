

// eslint-disable-next-line react/prop-types
const Container = ({children}) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 ">
            {children}
        </div>
    );
};

export default Container;