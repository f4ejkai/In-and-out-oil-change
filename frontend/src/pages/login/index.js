import {useState} from "react";
import {authedRequest} from "../../http";
import {useNavigate} from "react-router-dom";
import {AuthConsumer as useAuth} from "../../auth";

export const Login = () => {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authedRequest.post(`/api/users/login`, {
      email,
      password
    });
    const token = res.data.token;
    alert("Login successfully!");
    login(token, res.data.user.username).then(() => {
      navigate('/bookings');
    })
  }
  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'w-75 m-auto mt-5'}>
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            required type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
