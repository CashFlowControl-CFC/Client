const initialState = {
    user:null,
    theme: 'dark'
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USER':
                return {...state, user: action.payload};   
        case 'SET_THEME':
                return {...state, theme: action.payload};   
        default: 
            return state;
    }
}