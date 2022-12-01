
export const Home = () => {
  return (
    <main className={'container-fluid p-0'}>
      <div className={'container mt-4'}>
        <h2 className={'text-center text-info fw-bold'}>The Service We provide</h2>
        <h5 className={'text-center text-secondary'}>
          Oil-Change for all car types
        </h5>
        <h6 className={'fw-bold'}>
          What we recomand for your car :
        </h6>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Regular vehicles</th>
              <th scope="col">Import Vehicles</th>
              <th scope="col">Turbocharged Vehicles</th>
              <th scope="col">Sports Car</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className={'fw-normal'}>0W-30</th>
              <td>5w-30</td>
              <td>5w-40</td>
              <td>10w-60</td>
            </tr>
            <tr>
              <th className={'fw-normal'}>Every 3 monthes</th>
              <td>Every 3 monthes</td>
              <td>Every 3 monthes</td>
              <td>Every 2 monthes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}
// Suggestions for your components:
// 1. add PropType
// 2. file name should be the same as the component name.