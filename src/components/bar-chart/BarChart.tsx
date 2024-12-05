import React, { FC } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ColumnChartProps {
  title: string;
  products: string[];
  data: string[];  // Keep data as string[]
  yAxisText: string;
  xAxisText: string;
}

const BarChart: FC<ColumnChartProps> = ({
  title,
  products,
  data,
  yAxisText,
  xAxisText,
}) => {
  // Convert the data to objects with a 'y' property, which is expected for a column chart
  const numericData = data.map(item => ({
    y: parseFloat(item),  // Convert the string to a number and assign it to the 'y' property
  }));

  const options: Highcharts.Options = {
    chart: {
      type: "column",  // Ensure the chart type is 'column'
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: products,  // These are the labels for the X-axis
    },
    yAxis: {
      min: 0,
      title: {
        text: yAxisText,
      },
    },
    series: [
      {
        type: 'column',  // Ensure this is explicitly defined
        name: xAxisText,
        data: numericData,  
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
