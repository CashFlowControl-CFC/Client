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
            deadline: '2023-12-12',
            last_cash: 0,
        },
        {
            id: '2',
            name: 'goal 2',
            cash: 443,
            total_cash: 1231,
            color: '#FF8CD8',
            image_link: 'https://raw.githubusercontent.com/Witcher-MTM/Witcher-MTM.github.io/main/Education.svg',
            image_color: '#48263C',
            deadline: '2023-05-16',
            last_cash: 0,
        }
    ]
}

export const targetReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_TARGETS':
            return {...state, targets: action.payload};
        case 'ADD_TARGET':
            return {...state, targets: [...state.targets ,action.payload]};
        default:
            return state;
    }
}