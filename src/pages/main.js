import styles from './Main.module.css';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { request } from '../utils/request';

export const Main = () => {
	const [fullName, setFullName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [problemDescription, setProblemDescription] = useState('');
	const [error, setError] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (fullName && phoneNumber && problemDescription) {
			setError('');
			request('/', 'POST', { fullName, phoneNumber, problemDescription }).then(
				() => {
					setFullName('');
					setPhoneNumber('');
					setProblemDescription('');
				},
			);
		} else {
			setError('Заполните все поля!');
		}
	};

	return (
		<div className={styles.App}>
			{error && <div className="alert alert-danger">{error}</div>}
			<div className="mt-5 me-auto ms-auto">
				<form className="mt-5 w-50 ms-auto me-auto" onSubmit={onFormSubmit}>
					<h1 className="mb-5">Запись к врачу</h1>
					<div className="mb-3">
						<label className="form-label">ФИО</label>
						<input
							type="text"
							value={fullName}
							className="form-control"
							id="exampleFormControlInput1"
							placeholder="Введите ФИО"
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Номер телефона</label>
						<InputMask
							mask="(+7) 999 999-99-99"
							value={phoneNumber}
							className="form-control"
							id="exampleFormControlInput2"
							placeholder="Введите номер телефона"
							onChange={(e) => setPhoneNumber(e.target.value)}
						></InputMask>
					</div>
					<div className="mb-3">
						<label className="form-label">Описание проблемы</label>
						<textarea
							className="form-control"
							value={problemDescription}
							id="exampleFormControlTextarea1"
							rows="3"
							onChange={(e) => setProblemDescription(e.target.value)}
						></textarea>
					</div>
					<button type="submit" className="btn btn-primary">
						Отправить
					</button>
				</form>
			</div>
		</div>
	);
};
