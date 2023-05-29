const initialState = {
    targets: []
}

export const targetReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TARGETS':
            return {...state, targets: action.payload};
        case 'ADD_TARGET':
            return {...state, targets: [...state.targets,action.payload]};
        default:
            return state;
    }
}