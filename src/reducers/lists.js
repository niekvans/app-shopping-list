const listReducerDefaultState = [];

export default (state = listReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    items: action.items
                }
            ];
        case 'SET_LISTS':
            return action.lists
        case 'REMOVE_LIST':
            return state.filter((list) => {
                return list.id !== action.id;
            });
        case 'EDIT_LIST':
            return state.map((list) => {
                if (list.id === action.id) {
                    return {
                        id: action.id,
                        title: action.title,
                        items: action.items
                    }
                }
                else {
                    return list
                }
            })

        default:
            return state;
    }
};