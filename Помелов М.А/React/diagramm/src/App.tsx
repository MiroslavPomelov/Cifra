import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './App.css'
import { useState } from 'react';

// type User = {
//   name: string,
//   age: number
// }

// const data: Array<User> = [
//   { name: 'Ivan', age: 34 },
//   { name: 'Valeryy', age: 42 },
//   { name: 'Petr', age: 15 },
//   { name: 'Anatolyy', age: 25 },
//   { name: 'Evgenyy', age: 62 },
// ];

type SprintData = {
  age: number,
  sprintTime: number
}

// const data: Array<SprintData> = [
//   { age: 20, sprintTime: 10.30 },
//   { age: 21, sprintTime: 9.63 },
//   { age: 22, sprintTime: 11.11 },
//   { age: 23, sprintTime: 11.11 },
//   { age: 24, sprintTime: 11.07 },
//   { age: 25, sprintTime: 9.74 },
//   { age: 26, sprintTime: 9.67 },
//   { age: 27, sprintTime: 10.10 },
//   { age: 28, sprintTime: 10.80 }
// ];

// const data = [
//   { name: '2020', expenses: 400, incomes: 2400 },
//   { name: '2021', expenses: 300, incomes: 1398 },
//   { name: '2022', expenses: 200, incomes: 9800 },
//   { name: '2023', expenses: 278, incomes: 3908 },
//   { name: '2024', expenses: 189, incomes: 4800 },
// ];

const data = [
  { name: "Ivan", sprintTime: 12.4 },
  { name: "Valeryy", sprintTime: 11.8 },
  { name: "Petr", sprintTime: 10.6 },
  { name: "Anatolyy", sprintTime: 13.0 },
  { name: "Evgenyy", sprintTime: 12.1 },
];


function App() {

  const [state, rerenderByStand] = useState<boolean>(true);
  const tickFormatter = (tick: any) => `${tick} sec`;

  return (
    <>
      <LineChart
        data={data}
        width={600}
        height={400}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray={'3 3'} />
        <XAxis dataKey={'name'} />
        <YAxis tickFormatter={tickFormatter} />
        <Tooltip />
        <Legend />
        <Line
          type={'monotone'}
          dataKey={'sprintTime'}
          stroke='violet'
          strokeWidth={2}
          isAnimationActive={state}
          animationDuration={2000}
        />
      </LineChart>

      <button onClick={() => {
        rerenderByStand(!state)
      }}>Change state</button>
    </>


  )
}

export default App
