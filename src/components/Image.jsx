import img from '../assets/coutinho98.png'

const Image = ({ }) => {
    return (
        <div className="mr-4">
            <img
                src={img}
                alt="Github Profile Picture"
                className="w-65 h-65" />
        </div>
    )
}

export default Image