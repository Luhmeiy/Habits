// components
import Header from "../../components/Header";
import SummaryTable from "../../components/SummaryTable";
import UserCard from "../../components/UserCard";

// interfaces
import { IUserData } from "../../interfaces/UserData";

// libraries
import { Link, useLocation, useParams } from 'react-router-dom';
import api from "../../lib/axios";

// React
import { useEffect, useState } from "react";

const HabitsSummary = () => {
	const [data, setData] = useState<IUserData>();
	const [isLoading, setIsLoading] = useState(true);
	const [userIdHolder, setUserIdHolder] = useState("");

	const {state} = useLocation();

	let { username } = useParams();
	username = username?.split("}")[0];

	useEffect(() => {
		if (state) {
			const { userId } = state;
			setUserIdHolder(userId);
		}

		api
			.get('/user', {
				params: {
					nickName: username
				}
			})
			.then(res => setData(res.data[0]))
			.catch(err => console.log(err))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return (
			<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
				<span className="w-full text-center text-5xl font-semibold text-white mt-10">Carregando...</span>
			</div>
		);
	}

	return (
		<>
			{data
				?
				<div className="w-screen h-screen flex justify-center items-center">
					<div className="w-full max-w-5xl px-6 flex flex-col gap-16">
						<Header userId={userIdHolder} />

						<div className="w-full flex gap-8">
							<SummaryTable userId={userIdHolder} userData={data} />
							<UserCard userId={userIdHolder} userData={data} />
						</div>
					</div>
				</div>
				:
				<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
					<span className="w-full text-center text-6xl font-semibold text-white mt-10">Usuário não encontrado!</span>
					<Link to="/" className="w-full text-center text-lg font-semibold text-purple-500 mt-5 hover:text-purple-400">Retornar para página inicial</Link>
				</div>
			}
		</>
	)
}

export default HabitsSummary;