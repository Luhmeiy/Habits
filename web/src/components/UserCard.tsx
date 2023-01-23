// components
import EditUserForm from "./EditUserForm";

// libraries
import api from "../lib/axios";
import { useParams } from "react-router-dom";
import { IData } from "../interfaces/Data";

// React
import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";

const UserCard = (userId: any) => {
	const [data, setData] = useState<IData>();
	const [isOpen, setIsOpen] = useState(false);

	let { username } = useParams();
	username = username?.split("}")[0];

	useEffect(() => {
		api
			.get('/user', {
				params: {
					nickName: username
				}
			})
			.then(res => {
				setData(res.data[0]);
			});
	}, []);

	function handleIsOpen(open: boolean) {
		setIsOpen(open);
	}

	return (
		<div className="w-3/12 bg-zinc-900 border-2 border-zinc-800 p-5 flex flex-col items-center justify-between rounded-lg">
			{data &&
				<>
					<div className="flex flex-col items-center">
						<img
							src={data.image}
							alt="User photo"
							className="w-36 h-36 rounded-[72px] mb-4"
						/>

						<h1 className="font-bold text-2xl text-center">{data.name}</h1>
					</div>

					{userId.userId &&
						<Dialog.Root open={isOpen}>
							<Dialog.Trigger
								type="button"
								className="mt-6 rounded-lg py-3 px-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
								onClick={() => handleIsOpen(true)}
							>
								Editar usuário
							</Dialog.Trigger>

							<Dialog.Portal>
								<Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

								<Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
									<Dialog.Close 
										className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200  focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
										onClick={() => handleIsOpen(false)}
									>
										<X
											size={24}
											aria-label="Fechar"
										/>
									</Dialog.Close>

									<Dialog.Title className="text-3xl leading-tight font-extrabold">
										Editar usuário
									</Dialog.Title>

									<EditUserForm userId={userId.userId} onIsOpen={handleIsOpen} />
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog.Root>
					}
				</>
			}
		</div>
	)
}

export default UserCard;