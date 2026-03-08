import React, { useEffect, useState } from "react";

const ExpiryAlert = () => {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {

    const res = await fetch("http://localhost:4000/api/expiry");
    const data = await res.json();

    setAlerts(data);
  };

  const getExpiryInfo = (expiryDate) => {

    const today = new Date();
    const expiry = new Date(expiryDate);

    const diffTime = expiry - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (daysLeft <= 7) {
      return {
        risk: "HIGH",
        color: "red",
        suggestion: "Offer discount / move to front shelf"
      };
    }

    if (daysLeft <= 15) {
      return {
        risk: "MEDIUM",
        color: "orange",
        suggestion: "Promote product for faster sales"
      };
    }

    return {
      risk: "SAFE",
      color: "green",
      suggestion: "Stock is safe"
    };
  };

  return (

    <div>

      <h2>Expiry Alerts</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Product</th>
            <th>Batch</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Days Left</th>
            <th>Risk</th>
            <th>Suggestion</th>
          </tr>
        </thead>

        <tbody>

          {alerts.map((batch) => {

            const info = getExpiryInfo(batch.expiryDate);

            const expiry = new Date(batch.expiryDate);
            const today = new Date();
            const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

            return (

              <tr key={batch._id}>

                <td>{batch.product.productName}</td>

                <td>{batch.batchNo}</td>

                <td>{batch.quantity}</td>

                <td>
                  {expiry.toLocaleDateString()}
                </td>

                <td>
                  {daysLeft} days
                </td>

                <td style={{ color: info.color }}>
                  {info.risk}
                </td>

                <td>
                  {info.suggestion}
                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );
};

export default ExpiryAlert;