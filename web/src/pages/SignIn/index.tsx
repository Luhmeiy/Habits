// Firebase
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../services/firebase';

// icons / logo
import { GoogleLogo } from 'phosphor-react';
import logoImage from '../../assets/logo.svg';

// libraries
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

// React
import { useState } from 'react';

const SignIn = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState<User>({} as User);

	function handleGoogleSignIn() {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	user.uid && api
		.get('/user', {
			params: {
				userId: user.uid
			}
		})
		.then(res => {
			if (res.data.length > 0) {
				navigate("/user", { state: { userId: user.uid } });
			} else {
				navigate("/register", { state: { userId: user.uid, username: user.displayName, photo: user.photoURL } });
			}
		})

	return (
		<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
			<img src={logoImage} alt="Habits" />

			<h1 className="text-4xl mb-10 mt-10 font-bold">Seja bem-vindo(a)!</h1>

			<span className="w-[350px] text-center text-lg font-semibold text-zinc-400">Faça login ou cadastre-se e comece já a acompanhar seus hábitos!</span>
			
			<button
				type="button"
				className="cursor-pointer h-14 w-[350px] linear bg-gradient-to-r from-purple-800 to-purple-400 p-1 mt-8"
				onClick={handleGoogleSignIn}
			>
				<span className="h-full w-full flex items-center justify-center bg-background  font-poppins text-lg hover:bg-zinc-800 transition-colors">
					<GoogleLogo className="text-2xl mr-2" />
					Entrar com Google
				</span>
			</button>
		</div>
	)
}

export default SignIn;