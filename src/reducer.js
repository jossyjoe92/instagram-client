export const initialState ={
    user: null,
    showTopNav:true,
    showSearchUser:false,
};

export const actionTypes = {
    Set_USER: "Set_USER",
    Set_Top_Nav:"Set_Top_Nav",
    Set_Search_User:"Set_Search_User"
};

const reducer = (state, action) =>{
    console.log(action);
    switch (action.type) {
        case actionTypes.Set_USER:
            return {
                ...state,
                user:action.user
            };
            case actionTypes.Set_Top_Nav:
                return {
                    ...state,
                    showTopNav: action.showTopNav
                };

                case actionTypes.Set_Search_User:
                    return {
                        ...state,
                        showSearchUser: action.showSearchUser
                    };
                

            default:
                return state;
    }
};

export default reducer;