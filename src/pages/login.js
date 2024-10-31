import { useState } from 'react';
import { request } from '../utils/request';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (email && password) {
			setError('');
			request('/login', 'POST', { email, password }).then(() =>
				navigate('/appointments'),
			);
		} else {
			setError('Заполните все поля!');
		}
	};

	return (
		<section className="h-80 w-80">
			<div className="container py-5 h-80">
				{error && <div className="alert alert-danger">{error}</div>}
				<div className="row d-flex justify-content-center align-items-center h-80">
					<div className="col">
						<div className="card card-registration my-4">
							<form
								className="card-body p-md-5 text-black"
								onSubmit={onFormSubmit}
							>
								<h3 className="mb-5 text-uppercase">Login</h3>

								<div className="form-outline mb-4">
									<input
										type="email"
										name="email"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="form-control form-control-lg"
									/>
									<label className="form-label">Email</label>
								</div>

								<div className="form-outline mb-3">
									<input
										type="password"
										name="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="form-control form-control-lg"
									/>
									<label className="form-label">Password</label>
								</div>

								<div className="d-flex justify-content-end pt-3">
									<button
										type="reset"
										className="btn btn-light btn-lg"
										onClick={() => {
											setEmail('');
											setPassword('');
										}}
									>
										Reset all
									</button>
									<button
										type="submit"
										className="btn btn-primary btn-lg ms-2"
									>
										Submit form
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
