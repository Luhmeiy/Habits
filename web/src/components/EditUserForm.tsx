// icons
import { Check } from "phosphor-react";

// interfaces
import { IUserData } from "../interfaces/UserData";

// libraries
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";

// React
import { FormEvent, useEffect, useState } from "react";

interface editUserProps {
	userId: string;
	onIsOpen: (open: boolean) => void;
	onImage: (url: string) => void;
	onName: (name: string) => void;
}

const EditUser = ({ userId, onIsOpen, onImage, onName }: editUserProps) => {
	const [data, setData] = useState<IUserData>();
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");

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
				setName(res.data[0].name);
				setNickname(res.data[0].nickname);
			});
	}, []);
	
	async function createNewUser(e: FormEvent) {
		e.preventDefault();

		await api
			.patch('user', {
				name,
				nickname,
				userId
			})
			.then(() => {
				navigate(`/user/${nickname}%7D`, { state: { userId: userId } });

				onName(`${name}`);
				onImage(`https://api.dicebear.com/5.x/micah/svg?seed=${nickname}&flip=true&backgroundColor=A855F7`);
				onIsOpen(false);

				alert("Usuário editado com sucesso!");
			})
			.catch(() => alert("Nome de usuário já está sendo utilizado!"));
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

					<button
						type="submit"
						className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
					>
						<Check
							size={20}
							weight="bold"
						/>
						Confirmar
					</button>
				</>
			}
		</form>
	)
}

export default EditUser;