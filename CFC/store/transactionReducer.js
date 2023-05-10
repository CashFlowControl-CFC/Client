const initialState = {
    data: [],
    isIncome: false,
    totalMoney: 0,
    selectedTransaction: {},
}

export const transactionReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_DATA':
            return {...state, data: action.payload};
        case 'ADD_TRANSACTION':
            return {...state, data: [...state.data, action.payload]};
        case 'INCOME':
            return {...state, isIncome: true}
        case 'EXPENSES':
            return {...state, isIncome: false}
        case 'ADD_INCOME':
            return {...state, totalMoney: Number(state.totalMoney) + Number(action.payload)}
        case 'ADD_EXPENSES':
            return {...state, totalMoney: Number(state.totalMoney) - Number(action.payload)}
        case 'SET_TOTALMONEY':
            return {...state, totalMoney: Number(action.payload)}
        case 'SET_SELECTED_TRANSACTION':
            return {...state, selectedTransaction: action.payload}
        default:
            return state;
    }
};