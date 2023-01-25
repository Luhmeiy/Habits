import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
			<span className="w-full text-center text-6xl font-semibold text-white mt-10">404 - Not Found</span>
			<Link to="/" className="w-full text-center text-lg font-semibold text-purple-500 mt-5 hover:text-purple-400">Retornar para página inicial</Link>
		</div>
	)
}

export default NotFound;