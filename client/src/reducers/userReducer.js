const SET_USER = "SET_USER"

const defaultState = {
    currentUser :{},
    isAuth: false
}

export default function userReducer(state = defaultState, action){
    if( action.type == 'SET_USER'){
        return{
        ...state,
        currentUser: action.payload.user,
        isAuth: true
        }
    }
    else{
        return state
    }
}

export const setUser = user =>({type : SET_USER, payload: user})