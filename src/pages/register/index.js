import {useState} from "react";
import {authedRequest, SERVER_URL} from "../../http";
import {useNavigate} from "react-router-dom";

export const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Two password are not same");
    }
    await authedRequest.post(`/api/users/register`, {
      email,
      password,
      username
    });
    alert("Register successfully!");
    navigate('/login', {replace: true});
  }
  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'w-75 m-auto mt-5'}>
        <h2>Register</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label  className="form-label">Username</label>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="form-control"
            aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            required type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required type="password" className="form-control" id="exampleInputPassword2" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
