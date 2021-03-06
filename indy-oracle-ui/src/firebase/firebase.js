import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doCreateUserEntry = (uid, email, phoneNumber, codeWord) => {
      const user = this.db.collection('users').add({
        uid: uid,
        email: email,
        phoneNumber: phoneNumber,
        codeWord: codeWord
      });  
    };

    doGetAccessToken = (accessToken) => {
      const docRef = this.db.collection('tokens').doc(accessToken);
      return docRef.get();
    };

    isValidAccessToken = async (accessToken) => {
      const doc = await this.doGetAccessToken(accessToken);
      return doc.exists && !doc.data().used;
    };

    doUseAccessToken = async (accessToken, usedBy) => {
      const docRef = await this.db.collection('tokens').doc(accessToken);
      docRef.update({ used: true, usedBy: usedBy });
    };
}

export default Firebase;