const initialState ={
    accounts: [],
    cash: 0,
    activeAccount: 1,
}

export const accountReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_ACTIVE_ACCOUNT':
            return {...state, activeAccount: action.payload}
        case 'SET_CASH':
            return {...state, cash: action.payload}
        case 'SET_ACCOUNTS':
            return {...state, accounts: action.payload}
        case 'UPDATE_ACCOUNT':
            const { newItem, index } = action.payload;
            const items = [...state.accounts];
            items[index] = newItem;
            return { ...state, accounts: items };
        default:
            return state;
    }
}