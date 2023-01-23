// components
import Header from "../../components/Header";
import SummaryTable from "../../components/SummaryTable";
import UserCard from "../../components/UserCard";

// libraries
import { useLocation, useParams } from 'react-router-dom';

const HabitsSummary = () => {
	const {state} = useLocation();
	let userIdHolder;

	let { username } = useParams();
	username = username?.split("}")[0];

	if (state) {
		const { userId } = state;
		userIdHolder = userId;
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="w-full max-w-5xl px-6 flex flex-col gap-16">
				<Header userId={userIdHolder} />

				<div className="w-full flex gap-8">
					<SummaryTable userId={userIdHolder} />
					<UserCard userId={userIdHolder} />
				</div>
			</div>
		</div>
	)
}

export default HabitsSummary;