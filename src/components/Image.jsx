import img from '../assets/coutinho98.png'

const Image = ({ }) => {
    return (
        <div className="mr-4">
            <img
                src={img}
                alt="Github Profile Picture"
                className="w-64 h-64" />
        </div>
    )
}

export default Image