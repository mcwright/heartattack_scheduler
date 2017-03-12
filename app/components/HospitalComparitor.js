import StackedBarGraph from "./StackedBarGraph";
import React from 'react';


const HospitalComparitor = React.createClass({
  render () {
    return (
      <div className="comparitor">
        <div className="row ">
            <h2 className="comparitor-name">{this.props.comparitorName}</h2>
            <StackedBarGraph triageType="Most Urgent" />
            <StackedBarGraph triageType="Urgent" />
            <StackedBarGraph triageType="Less Than Urgent" />
        </div>
      </div>
    );
  }
})

export default HospitalComparitor;