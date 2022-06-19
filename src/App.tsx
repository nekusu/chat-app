import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, Firestore, getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import FirebaseContext from './FirebaseContext';
import { Chat, Loading } from './components';
import config from './firebase/config';

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, loading] = useAuthState(auth);
  const messageCollection = collection(db as Firestore, 'messages');

  return (
    <FirebaseContext.Provider
      value={{ auth, db, user, messageCollection }}
    >
      <div className="App">
        {loading
          ? <Loading />
          : <Chat />
        }
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
