const initialState = {
    data: [
        { x: "Food", y: 10, fill: "#64EBC2", id: 1, image: "products.js", isIncome: false, date: '2023-04-10', comment: null },
        { x: "Family", y: 90, fill: "#FE8664", id: 2, image: "family.js", isIncome: false, date: '2023-04-11', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 3, image: "health.js", isIncome: false, date: '2023-04-10', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 4, image: "health.js", isIncome: true, date: '2023-04-08', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 5, image: "health.js", isIncome: false, date: '2023-03-30', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 6, image: "health.js", isIncome: true, date: '2023-04-10', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 7, image: "health.js", isIncome: true, date: '2023-04-07', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 8, image: "health.js", isIncome: false, date: '2023-04-06', comment: null },
        { x: "Health", y: 30, fill: "#8CFF98", id: 9, image: "health.js", isIncome: false, date: '2023-04-07', comment: null }],
    isIncome: false,
    totalMoney: 0
}

export const transactionReducer = (state = initialState, action) =>{
    switch(action.type){
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
        default:
            return state;
    }
};