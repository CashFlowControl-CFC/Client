const initialState = {
    targets: [
        {
            id: '1',
            name: 'goal 1',
            cash: 100,
            total_cash: 200,
            color: '#9FC9FF',
            image_link: 'https://raw.githubusercontent.com/Witcher-MTM/Witcher-MTM.github.io/main/Home.svg',
            image_color: '#273546',
            deadline: '2022-12-12',
        }
    ]
}

export const targetReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TARGETS':
            return {...state, targets: action.payload};
        case 'ADD_TARGET':
            return {...state, targets: [...state.targets,action.payload]};
        case 'UPDATE_TARGET':
            const { newItem, index } = action.payload;
            const items = [...state.targets];
            items[index] = newItem;
            return { ...state, targets: items };
        default:
            return state;
    }
}