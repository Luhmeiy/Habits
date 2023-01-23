import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAPMXEmixQqhGRVyKCLtqfe29czgiujqYQ",
	authDomain: "auth-1e36e.firebaseapp.com",
	projectId: "auth-1e36e",
	storageBucket: "auth-1e36e.appspot.com",
	messagingSenderId: "469929668863",
	appId: "1:469929668863:web:f43f584d4b2903d7ff5cca"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);