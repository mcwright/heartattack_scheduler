import React from 'react';


const DriveTimes = React.createClass({
  render () {
    console.log("drivetimes: ",this.props)
    if(this.props.hospitals){
      return (
        <div className="comparitor">
         <table className="table">
         <tr>
           <th>Hospital</th>
           <th>Distance</th>
           <th>Drive Time</th>
         </tr>
          <tr>
           <td>{this.props.hospitals[0].name}</td>
           <td>{this.props.hospitals[0].distance}</td>
           <td>{this.props.hospitals[0].duration}</td>
         </tr>
          <tr>
           <td>{this.props.hospitals[1].name}</td>
           <td>{this.props.hospitals[1].distance}</td>
           <td>{this.props.hospitals[1].duration}</td>
         </tr>
          <tr>
           <td>{this.props.hospitals[2].name}</td>
           <td>{this.props.hospitals[2].distance}</td>
           <td>{this.props.hospitals[2].duration}</td>
         </tr>
         </table>
        </div>
      );
    }

    else{
      return(<div> No Drive Times</div>);
    }
 }
})

export default DriveTimes;