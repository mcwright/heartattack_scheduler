/**
 * Created by orel- on 08/Dec/15.
 */
import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        /**
         * All your data for this component should be placed here.
         * Consider this as a properties of your component
         * You can set new ones like this:
         * this.whatever = 'whatever else';
         */

        this.origin="46.2244981,-63.105825";
        this.locationResolved="false";
        this.hospitals=[{name:"QEH",duration:"x km",distance:"xx seconds"},
            {name:"PCH",duration:"x km",distance:"xx seconds"},
            {name:"WEST",duration:"x km",distance:"xx seconds"}];

    }

    /**
    Here will be your listeners which were bound by `this.bindActions()`
    Example listener:

    on()
    onChangeWhatever(data) {
		this.whatever = data;
    }
updateDistances
    as you can see, it's just a setter
    */
        onUpdateDistances(distances) {
        console.log("hit the store",distances);
      //  this.hospitals = distances;
    }

}

export default alt.createStore(HomeStore);
