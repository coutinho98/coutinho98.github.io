import pic from '../assets/coutinho98.png';

const Image = ({ alt = 'coutinho98' }) => {
    return (
        <div className="grid place-items-center h-62 w-full">
            <img
                src={pic}
                alt={alt}
                className="w-42 h-42 transform translate-x-[-20rem] mt-[2rem]"
            />
        </div>
    );
};

export default Image;