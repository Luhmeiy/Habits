// components
import DeleteHabit from "./DeleteHabit";
import EditHabitForm from "./EditHabitForm";

// interfaces
import { IHabitsData } from "../interfaces/HabitsData";
import { IUserId } from "../interfaces/UserId";

// libraries
import api from "../lib/axios";

// React
import { useEffect, useState } from "react";

const HabitsCard = ({ userId }: IUserId) => {
	const [data, setData] = useState<IHabitsData[]>();

	useEffect(() => {
		api
			.get('/habits', {
				params: {
					userId: userId
				}
			})
			.then(res => {
				setData(res.data);
			})
	}, []);

	function handleData(newData: IHabitsData[]) {
		setData(newData);
	}

	return (
		<div className="w-full max-h-[110em] flex flex-col mt-6 pr-5 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-zinc-800">
			{data && data.length != 0
				?
					<>
						{data.map(habit => (
							<div className="grid grid-cols-[1fr_repeat(2,_min-content)] items-center border-b-2 border-zinc-800 pb-2 mt-2 gap-x-2" key={habit.id}>
								<h1 className="font-semibold leading-tight text-lg">{habit.title}</h1>

								<EditHabitForm userId={userId} habitId={habit.id} onSetData={handleData} />
								<DeleteHabit userId={userId} habitId={habit.id} onSetData={handleData} />
							</div>
						))}
					</>
				:
					<p className="font-semibold leading-tight text-center text-lg mt-6">Não há hábitos!</p>
			}
		</div>
	)
}

export default HabitsCard;