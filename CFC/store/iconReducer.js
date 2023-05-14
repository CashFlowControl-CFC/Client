const initialState = {
    icons: [],
    iconType: '',
    selectedIcon: 0
}

const iconReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_ICONS':
            return {...state, icons: action.payload};
        case 'SET_ICON_TYPE':
            return {...state, iconType: action.payload};
        case 'SET_SELECTED_ICON':
            return {...state, selectedIcon: action.payload};
        default:
            return state;
    }
}

export default iconReducer;