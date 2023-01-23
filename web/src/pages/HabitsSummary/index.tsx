// components
import Header from "../../components/Header";
import SummaryTable from "../../components/SummaryTable";

// libraries
import { Link, useLocation } from 'react-router-dom';

// logo
import logoImage from '../../assets/logo.svg';

const HabitsSummary = () => {
	const {state} = useLocation();
	let userIdHolder;

	if (state) {
		const { userId } = state;
		userIdHolder = userId;
	}

	return (
		<>
			{state
				?
					<div className="w-screen h-screen flex justify-center items-center">
						<div className="w-full max-w-5xl px-6 flex flex-col gap-16">
							<Header userId={userIdHolder} />
							<SummaryTable userId={userIdHolder} />
						</div>
					</div>
				:
					<>
						<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
							<img src={logoImage} alt="Habits" />
							<span className="w-[350px] text-center text-lg font-semibold text-zinc-400 mt-10">Retorne para a página inicial e faça login!</span>
							<Link to="/" className="w-[350px] text-center text-lg font-semibold text-purple-500 mt-2 hover:text-purple-400">Retornar para página inicial</Link>
						</div>
					</>
			}
		</>
	)
}

export default HabitsSummary;