import React from 'react';
import { Chart } from 'react-google-charts';

const RankProgressChart = ({ promotions }) => {

  const chartData = [['Date', 'Points']];
  promotions.forEach((promotion) => {
    chartData.push([promotion.date, promotion.rank.points_required]);
  });

  return (
    <Chart
      chartType="LineChart"
      data={chartData}
      width="100%"
      height="400px"
      legendToggle
    />
  );
};

export default RankProgressChart;
