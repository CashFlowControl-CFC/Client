const initialState = {
    categories: [],
    selectedCategory: 0,
}

export const categoriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'SET_SELECTED':
            return {...state, selectedCategory: action.payload};
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload};
        default:
            return state;
    }
}