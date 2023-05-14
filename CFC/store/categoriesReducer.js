const initialState = {
    categories: [],
    icons: [],
    selectedCategory: 0,
}

export const categoriesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'SET_ICONS':
            return {...state, icons: action.payload};
        case 'SET_SELECTED':
            return {...state, selectedCategory: action.payload};
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload};
        case 'UPDATE_CATEGORY':
            const { newItem, index } = action.payload;
            const items = [...state.categories];
            items[index] = newItem;
            return { ...state, categories: items };
        case 'REPLACE':
            const {id} = action.payload;
            const catItems = [...state.categories];
            catItems.splice(id, 1);
            catItems.unshift(selectedCategory);
            return { ...state, categories: catItems };
        default:
            return state;
    }
}