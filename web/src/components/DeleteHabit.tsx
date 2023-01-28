// icons
import { Check, X } from "phosphor-react";

// interfaces
import { IHabitsData } from "../interfaces/HabitsData";

// libraries
import * as Dialog from "@radix-ui/react-dialog";
import api from "../lib/axios";

// React
import { useState } from "react";

interface DeleteHabitProps {
	userId: string;
	habitId: string;
	onSetData: (newData: IHabitsData[]) => void;
}

const DeleteHabit = ({ userId, habitId, onSetData }: DeleteHabitProps) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	async function deleteHabit() {
		await api
			.patch('/habit_delete', {
				habitId: habitId
			});

		await api
			.get('/habits', {
				params: {
					userId: userId
				}
			})
			.then(res => onSetData(res.data))
			.finally(() => setIsDeleteOpen(false));
		
		alert("Hábito excluído com sucesso!");
	}

	return (
		<Dialog.Root open={isDeleteOpen}>
			<Dialog.Trigger
				type="button"
				className="bg-red-500 p-1 rounded-lg cursor-pointer hover:bg-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-background"
				onClick={() => setIsDeleteOpen(true)}
			>
				<X
					size={28}
					aria-label="Excluir"
				/>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay
					className="w-screen h-screen fixed inset-0"
					onClick={() => setIsDeleteOpen(false)}
				/>

				<Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md max-h-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<Dialog.Close
						className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200  focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
						onClick={() => setIsDeleteOpen(false)}
					>
						<X
							size={24}
							aria-label="Fechar"
						/>
					</Dialog.Close>

					<div className="flex flex-col items-center mt-6">
						<h1 className="text-3xl leading-tight font-extrabold text-center">Deseja mesmo deletar esse hábito?</h1>

						<div className="w-8/12 flex justify-between mt-10">
							<button
								className="bg-green-500 py-3 px-10 rounded-lg hover:bg-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
								onClick={() => deleteHabit()}
							>
								<Check
									size={24}
									aria-label="Sim"
								/>
							</button>
							
							<button
								className="bg-red-500 py-3 px-10 rounded-lg hover:bg-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
								onClick={() => setIsDeleteOpen(false)}
							>
								<X
									size={24}
									aria-label="Não"
								/>
							</button>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>	
	)
}

export default DeleteHabit;