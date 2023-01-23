// components
import NewHabitForm from './NewHabitForm';

// interfaces
import { IData } from '../interfaces/Data';

// libraries
import api from '../lib/axios';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, useParams } from 'react-router-dom';

// icons / logo
import { Plus, X } from 'phosphor-react';
import logoImage from '../assets/logo.svg';

// React
import { useEffect, useState } from 'react';

const Header = (userId: any) => {
	const [data, setData] = useState<IData>();

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
			})
	}, []);
	
	return (
		<div className="w-full max-w-3xl mx-auto flex items-center justify-between">
			<img src={logoImage} alt="Habits" />

			{data &&
				<>
					{userId.userId
						?
						<Dialog.Root>
							<Dialog.Trigger
								type="button"
								className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
							>
								<Plus
									size={22.5}
									className="text-violet-500"
								/>
								Novo hábito
							</Dialog.Trigger>

							<Dialog.Portal>
								<Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

								<Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
									<Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200  focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900">
										<X
											size={24}
											aria-label="Fechar"
										/>
									</Dialog.Close>

									<Dialog.Title className="text-3xl leading-tight font-extrabold">
										Criar hábito
									</Dialog.Title>

									<NewHabitForm userId={userId.userId} />
								</Dialog.Content>
							</Dialog.Portal>
						</Dialog.Root>
						:
						<Link to="/" className="border border-violet-500 font-semibold rounded-lg px-4 py-3 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">Faça login</Link>
					}
				</>

			}
		</div>
	)
}

export default Header;