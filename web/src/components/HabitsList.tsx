// icons
import { Check } from 'phosphor-react';

// libraries
import * as Checkbox from '@radix-ui/react-checkbox';
import api from '../lib/axios';
import dayjs from 'dayjs';

// React
import { useEffect, useState } from 'react';

interface HabitsListProps {
	date: Date;
	userId: any;
	onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
	possibleHabits: {
		id: string;
		title: string;
		created_at: string;
	}[],
	completedHabits: string[] 
}

const HabitsList = ({ date, userId, onCompletedChanged }: HabitsListProps) => {
	const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

	useEffect(() => {
		api
			.get('day', {
				params: {
					date: date.toISOString(),
					userId: userId.userId
				}
			})
			.then(res => {
				setHabitsInfo(res.data);
			})
	}, []);

	async function handleToggleHabit(habitId: string) {
		await api.patch(`habits/${habitId}/toggle`);

		const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId);

		let completedHabits: string[] = []

		if (isHabitAlreadyCompleted) {
			completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
		} else {
			completedHabits = [...habitsInfo!.completedHabits, habitId];
		}
		
		setHabitsInfo({
			possibleHabits: habitsInfo!.possibleHabits,
			completedHabits
		});

		onCompletedChanged(completedHabits.length);
	}

	const isDataInPast = dayjs(date)
		.endOf('day')
		.isBefore(new Date());

	return (
		<div className="mt-6 flex flex-col gap-3">
			{habitsInfo?.possibleHabits && habitsInfo?.possibleHabits.length > 0
				?
				habitsInfo?.possibleHabits.map(habit => {
					return (
						<Checkbox.Root
							key={habit.id}
							checked={habitsInfo.completedHabits.includes(habit.id)}
							disabled={isDataInPast}
							className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
							onCheckedChange={() => handleToggleHabit(habit.id)}
						>
							<div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
								<Checkbox.Indicator>
									<Check size={20} className="text-white" />
								</Checkbox.Indicator>
							</div>
	
							<span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">{habit.title}</span>
						</Checkbox.Root>
					)
				})
				:
				<p className="font-semibold text-zinc-400">Você ainda não está monitorando nenhum hábito!</p>
			}
		</div>
	)
}

export default HabitsList;