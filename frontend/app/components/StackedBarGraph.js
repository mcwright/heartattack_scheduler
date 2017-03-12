import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
import React from 'react';


const data = [
      {name: 'QEH', wait: 30, drive: 15, amt: 1},
      {name: 'PCH', wait: 30, drive: 13, amt: 1},
      {name: 'WEST', wait: 20, drive: 60, amt: 1},
];
const StackedBarChart = React.createClass({
  render () {
    return (
      <div className="col-lg-4 col-sm-12">


        <BarChart width={300} height={300} data={data}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Bar dataKey="drive" stackId="a" fill="#3cb073" />
         <Bar dataKey="wait" stackId="a" fill="#3c79b0" />
        </BarChart>
        <h3 className="triage-type">{this.props.triageType}</h3>
      </div>
    );
  }
})

export default StackedBarChart;