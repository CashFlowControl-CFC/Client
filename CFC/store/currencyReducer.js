const initialState = {
    currency: [],
    symbols: [
        {id: '1', name: 'UAH', symb:'₴'}, 
        {id: '2', name: 'USD', symb:'$'}, 
        {id: '3', name: 'EUR', symb:'€'}
    ],
    current: 'UAH'
}

export const currencyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_CURRENCY':
            return {...state, currency: action.payload}
        case 'SET_CURRENT':
            return {...state, current: action.payload}
        default:
            return state;
    }
}