import React from "react";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
const BarChart = ({chartData}) => {
    return ( 
        <div className="bar-chart">
            <Bar data={chartData}
            options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Work Data"
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                 }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "",
                    }
                  },
                }
              }} />
        </div>
     );
}
 
export default BarChart;