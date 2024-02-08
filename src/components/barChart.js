import React from 'react';
import { Bar } from "react-chartjs-2";
import "./charts.css";
import "../css/dashboard.css";

export const BarChart = () => {
    return (
        <div className="barchart-container" style={{width: '400px', height: '300px', paddingTop: '25px'}}> {/* Adjust the width and height as needed */}
            <h2 className="barchart-title" style={{paddingBottom:'50px', paddingTop:'20px', fontSize:'25px', textAlign:'center', fontWeight:'bold', color:'black', fontFamily:'"DejaVu Sans Mono", monospace'}}>Category Breakdown</h2>
            <div className="barchart-component">
                <Bar
                    data={{
                        labels: ["Sports", "Cooking", "Cleaning", "Teaching"],
                        datasets: [
                            {
                                label: "Count",
                                data: [400, 331, 310, 250],
                                backgroundColor: [
                                    "rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                ],
                                borderRadius: 5,
                            },
                        ],
                    }}
                    options={{
                        indexAxis: 'y',
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            y: {
                                grid: {
                                    display: false,
                                },
                            },
                            x: {
                                grid: {
                                    display: false,
                                },
                            },
                        },
                    }}
                    height={200} // Adjust the height of the chart
                />
            </div>
        </div>
    );
}

export default BarChart;