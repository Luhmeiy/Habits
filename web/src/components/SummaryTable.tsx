// components / utils
import EmptyDay from "./EmptyDay";
import generateDatesFromYearBeginning from "../utils/generate-dates-from-year-beginning";
import generateRestOfDates from "../utils/generate-rest-of-dates";
import HabitDay from "./HabitDay";

// interfaces
import { IData } from "../interfaces/Data";

//libraries
import api from "../lib/axios";
import dayjs from "dayjs";

// React
import { useEffect, useState } from "react";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const summaryDates = generateDatesFromYearBeginning();
const summaryLaterDates = generateRestOfDates();

type Summary = {
	id: string;
	date: string;
	amount: number;
	completed: number;
}[]

interface SummaryTableProps {
	userId: any;
	userData: IData;
}

const SummaryTable = ({ userId, userData }: SummaryTableProps) => {
	const [summary, setSummary] = useState<Summary>([]);

	useEffect(() => {
		api
			.get(`/summary/${userData.id}`)
			.then(res => setSummary(res.data));
	}, []);

	return (
		<div className="w-9/12 flex">
			<div className="grid grid-rows-7 grid-flow-row gap-3 pt-1 pb-6">
				{weekDays.map((weekDay, i) => (
					<div
						key={`${weekDay}-${i}`}
						className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
					>
						{weekDay}
					</div>
				))}
			</div>

			<div className="grid grid-rows-7 grid-flow-col gap-3 scrollbar scrollbar-thumb-purple-500 scrollbar-track-zinc-800 scrollbar-w-3 px-1 pt-1 pb-6">
				{summary.length > 0 && summaryDates.map(date => {
					const dayInSummary = summary.find(day => {
						return dayjs(date).isSame(day.date, 'day');
					});

					return (
						<HabitDay
							key={date.toString()}
							date={date}
							userId={userId}
							amount={dayInSummary?.amount}
							defaultCompleted={dayInSummary?.completed}
						/>
					)
				})}

				{summaryLaterDates.map((date, i) => (
					<EmptyDay
						key={i}
						date={date}
					/>
				))}
			</div>
		</div>
	)
}

export default SummaryTable;