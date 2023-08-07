var _state = {
    config: {
        configurationID: -1,
        configType: 1,
        configTypeName: "DAP",
        priceForConfiguration: 1,
        rateForConfiguration: 1,
        configurationForKM: 1.0,
        configurationForTime: 1.0,
        dayOfTheWeek: 1,
        configEnabled: true
    }
}


export function appReducer(state = _state, action) {


    let stateDup = state;


   

    switch (action.type) {
        case 'editConfig':
            console.log(JSON.stringify(action.payload));
            stateDup['config'] = {
                configurationID: action.payload["configurationID"],
                configType: action.payload["configType"],
                configTypeName:action.payload["configTypeName"],
                priceForConfiguration: action.payload["priceForConfiguration"],
                rateForConfiguration: action.payload["rateForConfiguration"],
                configurationForKM: action.payload["configurationForKM"],
                configurationForTime: action.payload["configurationForTime"],
                dayOfTheWeek: action.payload["dayOfTheWeek"],
                configEnabled: action.payload["configEnabled"]
            };
            return stateDup
            default :
            console.log(state);
            return state
    }

}