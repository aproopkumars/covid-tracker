import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import "./Chart.css";

const Chart = ({ data: { hospitalized, recovered, deaths }, state }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ hospitalized }) => hospitalized),
            label: "Hospitalized",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = state ? (
    <Bar
      data={{
        labels: ["Hospitalized", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(251, 255, 0, 0.877)",
              "rgb(0, 255, 255)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [hospitalized, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${state}` },
      }}
    />
  ) : null;

  return <div className="container">{state ? barChart : lineChart}</div>;
};

export default Chart;
