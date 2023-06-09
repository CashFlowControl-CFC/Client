const initialState = {
    avatars: [],
    avatar_id: null
}

export const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AVATARS':
            return { ...state, avatars: action.payload };
        case 'SET_AVATAR_ID':
            return { ...state, avatar_id: action.payload };
        default:
            return state;
    }
}