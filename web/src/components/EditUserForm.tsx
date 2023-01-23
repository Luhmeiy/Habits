// icons
import { Check } from "phosphor-react";

// interfaces
import { IData } from "../interfaces/Data";

// libraries
import api from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

// React
import { FormEvent, useEffect, useState } from "react";

interface editUserProps {
	userId: any,
	onIsOpen: (open: boolean) => void
}

const EditUser = ({ userId, onIsOpen }: editUserProps) => {
	const [data, setData] = useState<IData>();
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	const [image, setImage] = useState("");

	let { username } = useParams();
	username = username?.split("}")[0];

	const navigate = useNavigate();

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

	useEffect(() => {
		if (data) {
			setName(data.name);
			setNickname(data.nickname);
			setImage(data.image);
		}
	}, [data]);
	
	async function createNewUser(e: FormEvent) {
		e.preventDefault();

		await api.patch('user', {
			name,
			nickname,
			image,
			userId
		});

		navigate(`/user/${nickname}%7D`, { state: { userId: userId } });

		onIsOpen(false);

		alert("Usuário editado com sucesso!");
	}

	return (
		<form
			onSubmit={createNewUser}
			className="w-full flex flex-col mt-6"
		>
			{data &&
				<>
					<label htmlFor="name" className="font-semibold leading-tight">Nome</label>

					<input
						type="text"
						id="name"
						className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
						autoFocus
						defaultValue={name}
						onChange={e => setName(e.target.value)}
					/>

					<label htmlFor="nickname" className="font-semibold leading-tight mt-4">Nickname</label>

					<input
						type="text"
						id="nickname"
						className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
						autoFocus
						value={nickname}
						onChange={e => setNickname(e.target.value)}
					/>
					
					<label htmlFor="image" className="font-semibold leading-tight mt-4">Imagem</label>

					<input
						type="text"
						id="image"
						className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
						autoFocus
						value={image}
						onChange={e => setImage(e.target.value)}
					/>

					<button
						type="submit"
						className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
					>
						<Check size={20} weight="bold" />
						Confirmar
					</button>
				</>
			}
		</form>
	)
}

export default EditUser;