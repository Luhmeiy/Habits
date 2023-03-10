// libraries
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './lib/dayjs';

// pages
import HabitsSummary from './pages/HabitsSummary';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

// styles / SCSS
import './styles/global.scss';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/register" element={<Register />} />
				<Route path="/user/:username" element={<HabitsSummary />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;