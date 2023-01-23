// libraries
import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';

// React
import { useEffect, useState } from 'react';

interface HabitDayProps {
	date: Date;
}

const EmptyDay = ({ date }: HabitDayProps) => {
	const [dayAndMonth, setDayAndMonth] = useState("");
	const [dayOfWeek, setDayOfWeek] = useState("");

	useEffect(() => {
		setDayAndMonth(dayjs(date).format('DD/MM'));
		setDayOfWeek(dayjs(date).format('dddd'));
	}, []);

	return (
		<Popover.Root>
			<Popover.Trigger className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background" />
	
			<Popover.Portal>
				<Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
					<span className="font-semibold text-zinc-400">{dayOfWeek}</span>
					<span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>
	
					<Popover.Arrow
						height={8}
						width={16}
						className="fill-zinc-900"
					/>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	)
}

export default EmptyDay;