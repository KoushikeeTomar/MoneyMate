import { useEffect, useState } from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function CategoryAnalytics() {

  const [categories, setCategories] = useState([]);

  // FETCH CATEGORY DATA
  const fetchCategories = async () => {

    try {

      const response = await API.get(
        "/dashboard/categories"
      );

      // CONVERT OBJECT TO ARRAY
      const formattedData = Object.entries(
        response.data
      ).map(([category, amount]) => ({
        category,
        amount,
      }));

      setCategories(formattedData);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCategories();

  }, []);

  // COLORS
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (

    <div>

      <h1>Category Analytics</h1>

      <hr />

      <PieChart width={400} height={400}>

        <Pie
          data={categories}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >

          {
            categories.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))
          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </div>

  );

}

export default CategoryAnalytics;