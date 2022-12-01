import {useLocation, useNavigate} from 'react-router-dom';
import {AuthConsumer as useAuth} from "../auth";

export const Header = () => {
  const {logout, authed} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className={'d-flex p-3 bg-secondary text-white align-items-center'}>
      <h1
        role={'button'}
        onClick={() => navigate('')}
        className={'me-auto'}>In and out oil change service</h1>
      <button
        onClick={() => navigate('best-price')}
        className={`btn ${pathname === '/best-price' ? 'btn-info text-white' : 'btn-outline-light'} me-2`}>Our Best Price</button>
      {authed && (
        //  not sure about using am empty tag name. Maybe use div?
        <>
          <button onClick={() => navigate('/bookings')} className={`btn btn-text ${pathname === '/bookings' ? 'text-info' : 'text-white'}`}>My Bookings</button>
          <button onClick={() => {
            logout().then(() => {
              navigate('/login')
            })
          }} className={'btn btn-text text-white'}>Log out</button>
        </>
      )}
      {!authed && (
        <>
          <button
            onClick={() => navigate('login')}
            className={`btn btn-text me-1 ${pathname === '/login' ? 'text-info' : 'text-white'}`}>Login</button>
          <span className={'me-1'}>/</span>
          <button
            onClick={() => navigate('register')}
            className={`btn btn-text me-1 ${pathname === '/register' ? 'text-info' : 'text-white'}`}>Register</button>
        </>
      )}
    </header>
  )
}
