import React from 'react';
import {Chart as ChartJS} from "chart.js/auto";
import { Bar, Doughnut, Line} from "react-chartjs-2";
import "./charts.css";
import "../css/dashboard.css";
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Teenagers', 'Adults', 'Senior Citizens'],
    datasets: [
      {
        label: 'People',
        data: [721, 310, 325],
        backgroundColor: ['rgba(43, 63, 229, 0.8)', 'rgba(250, 192, 19, 0.8)', 'rgba(253, 135, 135, 0.8)'],
        borderColor: ['rgba(43, 63, 229, 0.8)', 'rgba(250, 192, 19, 0.8)', 'rgba(253, 135, 135, 0.8)'],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Demographic of Volunteers',
        font: {
            size: 30,
            family: '"DejaVu Sans Mono", monospace',
            color: 'black',
            weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed) {
              label += context.parsed.toLocaleString();
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '410px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;