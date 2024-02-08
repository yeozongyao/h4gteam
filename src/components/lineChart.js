import React from 'react';
import { Line } from "react-chartjs-2";
import "../css/dashboard.css";

export const LineChart = () => {
  return (
    <div className="linechart-card" style={{ width: '700px', height: '410px' }}> {/* Adjust width and height */}
      <Line
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          datasets: [
            {
              label: "User Count",
              data: [500, 720, 840, 900, 930, 1000, 1200, 1356],
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
            {
              label: "Event Sign Ups",
              data: [400, 510, 631, 712, 713, 750, 800, 1000],
              backgroundColor: "#FF3030",
              borderColor: "#FF3030",
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "Monthly Revenue & Cost",
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;