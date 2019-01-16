import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } from 'react-native-dotenv';

const config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };