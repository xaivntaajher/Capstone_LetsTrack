import React, { useState } from 'react';
import { Chart } from "react-google-charts";

const RankProgressChart = (props) => {
    return ( 
        <Chart
        chartType="LineChart"
        data={[["Date", "Total Points"], ['2023-06-13', 20]]}
        width="100%"
        height="400px"
        legendToggle
        />
     );
}
 
export default RankProgressChart;