/**
 * Created by orel- on 06/Dec/15.
 */
import React from 'react';
import HospitalComparitor from "./HospitalComparitor";
import DriveTimes from "./DriveTimes";
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import {Link} from 'react-router';
//import Distance from 'google-distance';

// Your main class, as defined in routes.
// You can read more about component's lifecycle here
// https://facebook.github.io/react/docs/component-specs.html

class Home extends React.Component {
    constructor(props) {
        super(props);

        var currentLocation;

        // We are getting state from our store
        this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);




    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        HomeStore.listen(this.onChange);

      navigator.geolocation.getCurrentPosition(this.storePosition);




    }


    storePosition(position) {
       console.log("**Received Location** ");

       console.log(position.coords);




        var distance = require('google-distance-matrix');

        var origins = [position.coords.latitude+","+position.coords.longitude];
        var destinations = [' 65 Roy Boates Avenue, Summerside, PE C1N 2A9', '60 Riverside Dr, Charlottetown, PE C1A 8T5','148 Poplar St, Alberton, PE C0B 1B0'];

        distance.matrix(origins, destinations, function (err, distances) {
            if (!err){
                console.log(distances);

            }

        });





    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accodingly
        this.setState(state);
    }


    render() {
           console.log("PASING: ", this);
        return (
            <div>
                <div className="content">
                    <div className="title-bar">
                        <h1>Heart Attack Scheduler</h1>
                    </div>
                    <DriveTimes hospitals={this.state.hospitals} />
                    <HospitalComparitor comparitorName="Wait Times" />
                    <HospitalComparitor comparitorName="Historical" />
                </div>
            </div>
        );
    }
}

export default Home;
