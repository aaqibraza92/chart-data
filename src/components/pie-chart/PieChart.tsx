import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieChartProps {
  title: string;
  data: { name: string; y: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
    },
    title: {
      text: title,
    },
    series: [
      {
        type: "pie",
        name: "Data",
        data: data,
      },
    ],
  };

  useEffect(() => {}, [data]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
