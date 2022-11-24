
export const BookingList = ({bookings}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Oil Type</th>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      {bookings.map((booking, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{booking.type}</td>
            <td>{booking.date}</td>
          </tr>
        )
      })}

      </tbody>
    </table>
  )
}
