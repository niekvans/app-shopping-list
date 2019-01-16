import database from './../firebase/firebase';

import { databaseSection } from 'react-native-dotenv';

export const addList = ({ id, title, items }) => {
    return {
        type: 'ADD_LIST',
        id,
        title,
        items
    };
};

export const startAddList = (listData) => {
    // console.log('going to add to db ', listData);
    database.ref(`/${databaseSection}`).push({ title: listData.title, items: listData.items })
        .then((ref) => {
            // console.log('have added ', ref.key);
            dispatch(addList({
                id: ref.key,
                title: listData.title,
                items: listData.items
            }));
        })
        .catch((error) => {
            console.log(error);
        })
};

export const editList = ({ id, title, items }) => ({
    type: 'EDIT_LIST',
    id,
    title,
    items
});

export const startEditList = ({ id, title, items }) => {
    return database.ref(`/${databaseSection}/${id}`).update({ title, items });
};


export const setLists = (lists) => ({
    type: 'SET_LISTS',
    lists
});

export const startSetLists = () => {
    return (dispatch) => {
        return database.ref(`/${databaseSection}`).once('value')
            .then((snapshot) => {
                const lists = [];
                snapshot.forEach((childSnapshot) => {
                    lists.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                dispatch(setLists(lists));
            });
    };
};

export const removeList = (id) => ({
    type: 'REMOVE_LIST',
    id
});

export const startRemoveList = (id) => {
    return database.ref(`/${databaseSection}/${id}`).remove()
};