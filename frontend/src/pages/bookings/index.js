import {useEffect, useState} from "react";
import {AuthConsumer as useAuth} from "../../auth";
import {authedRequest} from "../../http";
import {BookingList} from "./components/BookingList";

export const Bookings = () => {
  const { username, authed } = useAuth();
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState('0W-20');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await authedRequest.post(`/api/bookings`, {
      type,
      date
    });
    setSuccess(true);
    setRefresh(!refresh);
  }
  useEffect(() => {
    authedRequest.get(`/api/bookings`)
      .then(res => {
        if (res && res.data) {
          setBookings(res.data);
        }
      })
  }, [refresh]);
  return (
    <main className={'container mt-4'}>
      <h2 className={'text-center text-black fw-bold'}>
        Welcome: {username}
      </h2>
      <form onSubmit={handleSubmit} className={'mt-3 w-75 m-auto'}>
        <h3>Booking new maintain</h3>
        <div className={'mb-3'}>
          <label className={'form-label'}>Desired service date</label>
          <input className={'form-control w-25'}
                 required
                 value={date}
                 onChange={e => setDate(e.target.value)}
                type={'date'}/>
        </div>
        <div className={'mb-3'}>
          <label className={'form-label'}>Desired oil type</label>
          <select value={type} onChange={e => setType(e.target.value)} required className={'form-select w-25'}>
            <option value={'0W-20'}>0W-20</option>
            <option value={'5W-30'}>5W-30</option>
            <option value={'5W-40'}>5W-40</option>
            <option value={'10W-60'}>10W-60</option>
          </select>
        </div>
        <div>
          <button className={'btn btn-primary'}>Submit</button>
        </div>
      </form>
      {success && (
        <div>
          <div className="alert alert-success w-75 m-auto mt-5" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            <big>Booking successfully!</big>
          </div>
          <table className={'table w-75 m-auto mt-2'}>
            <tbody>
            <tr>
              <td className={'fw-bold'}>Your next service is at:</td>
              <td >{date}</td>
            </tr>
            <tr>
              <td className={'fw-bold'}>The oil you choosed:</td>
              <td >{type}</td>
            </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className={'w-75 m-auto mt-5'}>
        <h3>
          Your bookings
        </h3>
        <BookingList bookings={bookings}/>
      </div>
    </main>
  )
}
