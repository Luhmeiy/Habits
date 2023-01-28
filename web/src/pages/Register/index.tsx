// libraries
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

// logo
import logoImage from '../../assets/logo.svg';

// React
import { FormEvent, useState } from 'react';

const Register = () => {
    const [nickname, setNickname] = useState("");

    const navigate = useNavigate();

    const {state} = useLocation();

    async function createNewUser(e: FormEvent) {
        e.preventDefault();

        if (!nickname) {
            return alert("Preencha o nickname!");
        }

        if (state) {
            const { userId, username } = state;

            await api
                .post('user', {
                    id: userId,
                    name: username,
                    nickname
                })
                .then(() => {
                    navigate(`/user/${nickname}`, { state: { userId: userId } });
                })
                .catch(() => alert("Nome de usuário já está sendo utilizado!"));
        }
    }

	return (
		<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
			<img src={logoImage} alt="Habits" />

            {state 
                ?
                <form
                    onSubmit={createNewUser}
                    className="w-[350px] flex flex-col mt-20"
                >
                    <label htmlFor="title" className="font-semibold leading-tight">Qual apelido deseja usar?</label>

                    <input type="text" id="username" className="p-3 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900" defaultValue={nickname} onChange={e => setNickname(e.target.value)} />

                    <button
                        type="submit"
                        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                    >
                        Confirmar
                    </button>
                </form>
                :
                <>
                    <span className="w-[350px] text-center text-lg font-semibold text-zinc-400 mt-10">Retorne para a página inicial e faça login!</span>
                    <Link to="/" className="w-[350px] text-center text-lg font-semibold text-purple-500 mt-2 hover:text-purple-400">Retornar para página inicial</Link>
                </>
            }
		</div>
	)
}

export default Register;