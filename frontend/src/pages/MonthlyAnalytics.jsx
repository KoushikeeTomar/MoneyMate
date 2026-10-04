import { useEffect, useState } from "react";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function MonthlyAnalytics() {

  const [monthlyData, setMonthlyData] = useState([]);

  // FETCH MONTHLY DATA
  const fetchMonthlyData = async () => {

    try {

      const response = await API.get(
        "/dashboard/monthly"
      );

      // CONVERT OBJECT TO ARRAY
      const formattedData = Object.entries(
        response.data
      ).map(([month, amount]) => ({
        month,
        amount,
      }));

      setMonthlyData(formattedData);

    } catch (error) {

      console.log(error);

    }

  };

  // FETCH ON PAGE LOAD
  useEffect(() => {

    fetchMonthlyData();

  }, []);

  return (

    <div>

      <h1>Monthly Analytics</h1>

      <hr />

      <BarChart
        width={700}
        height={400}
        data={monthlyData}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="amount" />

      </BarChart>

    </div>

  );

}

export default MonthlyAnalytics;