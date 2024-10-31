import { Routes, Route } from 'react-router-dom';
import { Main, Login, Appointments } from './pages';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/login" element={<Login />} />
			<Route path="/appointments" element={<Appointments />} />
		</Routes>
	);
};
