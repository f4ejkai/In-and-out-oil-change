
export const BestPrices = () => {
  const prices = [
    {
      engineOilType: '0W-20',
      oilChangeRate: 20,
      materialFeePerLitter: 15
    },
    {
      engineOilType: '5W-30',
      oilChangeRate: 20,
      materialFeePerLitter: 20
    },
    {
      engineOilType: '5W-40',
      oilChangeRate: 20,
      materialFeePerLitter: 30
    },
    {
      engineOilType: '10W-60',
      oilChangeRate: 20,
      materialFeePerLitter: 60
    }
  ];
  return (
    <div className={'container mt-4'}>
      <h6 className={'fw-bold'}>
        Our Best Price break down:
      </h6>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Engine Oil Type</th>
            <th scope="col">Oil-change Rate</th>
            <th scope="col">Material fee per litter</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => {
            return (
              <tr key={price.engineOilType}>
                <td>{price.engineOilType}</td>
                <td>{price.oilChangeRate}</td>
                <td>{price.materialFeePerLitter}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
