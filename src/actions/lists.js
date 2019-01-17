import database from './../firebase/firebase';
import { databaseSection } from 'react-native-dotenv';

export const createList = () => {
    newRef = database.ref(`/${databaseSection}`).push({ title: '' });
    return newRef.key;
};

export const updateItem = (listid, id, newText) => {
    database.ref(`/${databaseSection}/${listid}/items/${id}`).set(newText);
};

export const updateTitle = (listid, title) => {
    database.ref(`/${databaseSection}/${listid}/`).update({ title });
}

export const pushListItem = (listid, text) => {
    database.ref(`/${databaseSection}/${listid}/items/`).push(text);
};

export const removeItem = (listid, id) => {
    database.ref(`/${databaseSection}/${listid}/items/${id}`).remove();
};

export const removeList = (listid) => {
    return database.ref(`/${databaseSection}/${listid}`).remove();
};