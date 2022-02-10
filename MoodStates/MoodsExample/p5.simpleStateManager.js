/*******************************************************************************************************************

    SimpleStateManager
    for P5.js

    Written by Scott Kildall

    Loads a CSV table in the constructor

    SimpleStateManager variables:
        this.statesTable        =  CSV file table, loaded in preload(), used in setup(), then not used again
        this.currentState       =  index of the current state in the array, default to 1st state
        this.states             =  Array of State variables

    State variables:
        this.stateName          = name of the state (for reference)
        this.imageFilename      = relative local path of filename
        this.transitions        = array of transitions (Strings)
        this.nextState          = next state we are going to
*********************************************************************************************************************/

class SimpleStateManager {
    // Clickable layout table is an OPTIONAL parameter
    constructor(statesFilename) {
        this.statesTable = loadTable(statesFilename, 'csv', 'header');
        this.currentState = 0;   
        this.states = [];     

        console.log("start");
    }

    // expects as .csv file with the format as outlined in the readme file
    // this will go through the states table and:
    // (1) add a new state for every unique state
    // (2) add a 
    setup() {
        console.log(this.statesTable);

        // For each row, allocate a new state, if it is unique
        // and always add a transition
        for( let i = 0; i < this.statesTable.getRowCount(); i++ ) {
            let stateName = this.statesTable.getString(i, 'StateName');
            console.log(stateName);
        }

        return this.hasValidStates;
    }
}

class State {
    constructor(stateName, imageFilename) {
        this.stateName = stateName;
        this.imageFilename = imageFilename;
        this.transitions = [];
        this.nextStates = [];
    }

    addTransition() {

    }
}
