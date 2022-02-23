/*******************************************************************************************************************

    ComplexStateMachine
    for P5.js

    Written by Scott Kildall

    Loads a CSV table in the constructor

    ComplexStateMachine variables:
        this.statesTable                =  CSV file table, loaded in preload(), used in setup(), then not used again
        this.currentState               =  index of the current state in the array, default to 1st state
        this.stateNames                 =  Array of state names
        this.states                     =  Array of State variables, matches entries and size of state names
        this.setImageFilenameCallback   =  Callback for image filename, when a new state is selected
        this.setTransitionsCallback     =  Callback for image filename, when a new state is selected
        

    State variables:
        this.stateName          = name of the state (for reference)
        this.imageFilename      = relative local path of filename
        this.transitions        = array of transitions (Strings)
        this.nextState          = next state we are going to
*********************************************************************************************************************/

class ComplexStateMachine {
    // Clickable layout table is an OPTIONAL parameter
    constructor(statesFilename, clickableLayoutFilename = null) {
        this.statesTable = loadTable(statesFilename, 'csv', 'header');
        this.currentState = 0;   
        this.stateNames = [];
        this.states = [];    
        this.stateNames = []; 
        this.setImageFilenameCallback = null;
        this.clickableArray = null;

        if( clickableLayoutFilename === null ) {
            this.clickableTable = null;
        }
        else {
            this.clickableTable = loadTable(clickableLayoutFilename, 'csv', 'header');
        }

        console.log(this.clickableTable);
    }

    // expects as .csv file with the format as outlined in the readme file
    // this will go through the states table and:
    // (1) add a new state for every unique state
    // (2) add a 
    setup(clickableManager, imageFilenameCallback) {
        console.log(this.statesTable);

        this.setImageFilenameCallback = imageFilenameCallback;
        this.clickableArray = clickableManager.getClickableArray();

        // For each row, allocate a new state, if it is unique
        // and always add a transition
        for( let i = 0; i < this.statesTable.getRowCount(); i++ ) {
            let stateName = this.statesTable.getString(i, 'StateName');
            
            // find the state index in the statesArray
            let stateArrayIndex = this.stateNames.indexOf(stateName); 

            console.log("index: " + i + " = " + stateName );
            console.log("state index = " + stateArrayIndex);

            // if not present, we add it
            if( stateArrayIndex === -1 ) {
                this.stateNames.push(stateName);
                this.states.push(new State(stateName, this.statesTable.getString(i, 'PNGFilename')));
                stateArrayIndex = this.states.length - 1;
            } 

            // add other info
            let nextState = this.statesTable.getString(i, 'NextState');
            let clickableName = this.statesTable.getString(i, 'ClickableName');

            this.states[stateArrayIndex].addInteraction(clickableName, nextState);

        }
        
        // All DONE
        console.log("Setup done");
        console.log(this.states);
        
        this.performCallbacks();

        return this.hasValidStates;
    }

    // a clickable was pressed, look for it in the interaction table
    clickablePressed(clickableName) {
        // this will be = the clickable pressed
         // go through each row, look for a match to the current state
      for (let i = 0; i < this.interactionTable.getRowCount(); i++) {

        // the .name property of a function will convert function to string for comparison
        if(this.currentStateName === this.interactionTable.getString(i, 'CurrentState') ) {
            // now, look for a match with the key typed, converting it to a string
            if( this.interactionTable.getString(i, 'ClickableName') === clickableName ) {
                // if a match, set the drawFunction to the next state, eval() converts
                // string to function
                this.changeState(this.interactionTable.getString(i, 'NextState') );
                break;
            }
        }
      }
    }

    // set new state, make callbacks
    newState(transitionsName) {
        //console.log(transitionsName)
        //console.log(this.states[this.currentState].transitions);
        
        // find the state index in the statesArray
        let newStateIndex = this.states[this.currentState].transitions.indexOf(transitionsName); 
        if( newStateIndex === -1 ) {
            console.log("Error in newState(), transition not found");
            return;
        }

        // grab the state name
        let newStateName = this.states[this.currentState].nextStates[newStateIndex];
        this.currentState = this.stateNames.indexOf(newStateName); 

        console.log( "new state = " + newStateName);   

        this.performCallbacks();
    }

    performCallbacks() {
        // perform initial callbacks - if there is an invalid CSV, this will produce an error
        this.setImageFilenameCallback(this.states[this.currentState].imageFilename);
    }
}

class State {
    constructor(stateName, imageFilename) {
        this.stateName = stateName;
        this.imageFilename = imageFilename;
        this.clickableNames = [];
        this.nextStates = [];
    }

    addInteraction(clickableName, nextState) {
        this.clickableNames.push(clickableName);
        this.nextStates.push(nextState);
    }
}
