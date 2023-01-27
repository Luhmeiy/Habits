// icons
import { Check, Pencil, X } from "phosphor-react";

// interfaces
import { IHabitsData, IWeekDays } from "../interfaces/HabitsData";

// libraries
import * as Checkbox from '@radix-ui/react-checkbox';
import api from "../lib/axios";
import * as Dialog from "@radix-ui/react-dialog";

// React
import { FormEvent, useEffect, useState } from "react";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

interface EditHabitFormProps {
	userId: string;
	habitId: string;
	onSetData: (newData: IHabitsData[]) => void;
}

const EditHabitForm = ({ userId, habitId, onSetData }: EditHabitFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [weekDays, setWeekDays] = useState<number[]>([]);

	useEffect(() => {
		api
			.get('habits_id', {
				params: {
					id: habitId
				}
			})
			.then(res => {
				setTitle(res.data[0].title);

				res.data[0].weekDays.map((weekDay: IWeekDays) => {
					setWeekDays(prevState => {
						return [...prevState, weekDay.week_day]
					});
				});
			})
	}, []);

	async function editHabit(e: FormEvent) {
		e.preventDefault();

		if (!title || weekDays.length === 0) {
			return;
		}

		await api
			.patch('/habit_rename', {
				habitId,
				title
			});

		await api
			.get("/habits", {
				params: {
					userId: userId
				}
			})
			.then(res => onSetData(res.data))
			.finally(() => setIsOpen(false));

		// await api.post('habits', {
		// 	title,
		// 	weekDays,
		// 	userId
		// });

		alert("Hábito editado com sucesso!");
	}

	function handleToggleWeekDay(weekDay: number) {
		if (weekDays.includes(weekDay)) {
			const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);

			setWeekDays(weekDaysWithRemovedOne);
		} else {
			setWeekDays((prevState) => [...prevState, weekDay]);
		}
	}

	return (
		<Dialog.Root open={isOpen}>
			<Dialog.Trigger
				type="button"
				className="bg-purple-500 p-1 rounded-lg cursor-pointer hover:bg-violet-400 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
				onClick={() => setIsOpen(true)}
			>
				<Pencil
					size={28}
					aria-label="Editar"
				/>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="w-screen h-screen fixed inset-0" onClick={() => setIsOpen(false)} />

				<Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md max-h-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200  focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900" onClick={() => setIsOpen(false)}>
						<X
							size={24}
							aria-label="Fechar"
						/>
					</Dialog.Close>

					<Dialog.Title className="text-3xl leading-tight font-extrabold">
						Lista de hábitos
					</Dialog.Title>


					<form className="w-full flex flex-col mt-6">
						{weekDays.length !== 0 &&
							<>
								<label htmlFor="title" className="font-semibold leading-tight">Deseja mudar o nome do hábito?</label>

								<input
									type="text"
									id="title"
									placeholder="Ex.: Exercícios, dormir bem, etc..."
									className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
									autoFocus
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>

								<label className="font-semibold leading-tight mt-4">Deseja mudar a recorrência?</label>

								<div className="flex flex-col gap-2 mt-3">
									{availableWeekDays.map((weekDay, i) => {
										return (
											<Checkbox.Root
												key={weekDay}
												className="flex items-center gap-3 group focus:outline-none"
												checked={weekDays.includes(i)}
												onCheckedChange={() => handleToggleWeekDay(i)}
											>
												<div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900">
													<Checkbox.Indicator>
														<Check size={20} className="text-white" />
													</Checkbox.Indicator>
												</div>

												<span className="text-white leading-tight">{weekDay}</span>
											</Checkbox.Root>
										)
									})}
								</div>

								<button
									className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
									onClick={editHabit}
								>
									<Check size={20} weight="bold" />
									Confirmar
								</button>
							</>
						}
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default EditHabitForm;