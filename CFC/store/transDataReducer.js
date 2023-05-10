const initialState = {
    comment: undefined,
    date: undefined,
    cash: undefined,
    isAdd: true,
    selectedTransaction: undefined,
}

export const transDataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SELECTED_TRANS':
            return {...state, selectedTransaction: action.payload};
        case 'SET_ISADD':
            return {...state, isAdd: action.payload};
        case 'SET_DATE':
            return {...state, date: action.payload};
        case 'SET_TRANS_CASH':
            return {...state, cash: action.payload};
        case 'SET_COMMENT':
            return {...state, comment: action.payload};
        default: 
            return state;
    }
}