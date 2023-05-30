const initialState = {
    payments: [],
}

const paymentReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_PAYMENTS':
            return {...state, payments: action.payload};
        case 'ADD_PAYMENT':
            return {...state, payments: [...state.payments, action.payload]};
        default:
            return state;
    }
}

export default paymentReducer;