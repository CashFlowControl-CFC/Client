const initialState = {
    data: [
        { x: "Food", y: 10, fill: "#64EBC2", id: 1, image: "food.js", isIncome: false, date: '2023-04-10' },
        { x: "Family", y: 90, fill: "#FE8664", id: 2, image: "family.js", isIncome: false, date: '2023-04-11' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 3, image: "health.js", isIncome: false, date: '2023-04-10' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 4, image: "health.js", isIncome: true, date: '2023-04-08' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 5, image: "health.js", isIncome: false, date: '2023-03-30' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 6, image: "health.js", isIncome: true, date: '2023-04-10' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 7, image: "health.js", isIncome: true, date: '2023-04-07' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 8, image: "health.js", isIncome: false, date: '2023-04-06' },
        { x: "Health", y: 30, fill: "#8CFF98", id: 9, image: "health.js", isIncome: false, date: '2023-04-07' }],
    isIncome: false,
}

export const transactionReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'ADD_ITEM':
            return {...state, data: [...state.data, action.payload]};
        case 'INCOME':
            return {...state, isIncome: true}
        case 'EXPENSES':
            return {...state, isIncome: false}
        default:
            return state;
    }
};