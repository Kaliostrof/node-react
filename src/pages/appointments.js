import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { useNavigate } from 'react-router-dom';

export const Appointments = () => {
	const [appointment, setAppointment] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		request('/appointments')
			.then((res) => res.json())
			.then((Responce) => setAppointment(Responce.data));
	}, []);

	const onLogOut = () => {
		request('/logout').then(() => navigate('/login'));
	};

	return (
		<section className="h-80 w-80">
			<nav className="navbar navbar-light bg-light navbar-expand">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<button className="nav-link" onClick={onLogOut}>
							Logout
						</button>
					</li>
				</ul>
			</nav>

			<div className="container py-5 h-80">
				<h1 className="mb-5">Заявки с формы</h1>

				<table className="table">
					<thead>
						<tr>
							<th scope="col">Дата отправки</th>
							<th scope="col">ФИО</th>
							<th scope="col">Телефон</th>
							<th scope="col">Проблема</th>
						</tr>
					</thead>
					<tbody>
						{appointment.map((list) => {
							return (
								<tr key={list._id}>
									<td>{list.date}</td>
									<td>{list.fullName}</td>
									<td>{list.phoneNumber}</td>
									<td>{list.problemDescription}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};
