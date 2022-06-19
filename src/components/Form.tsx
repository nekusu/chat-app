import { useContext, useState } from 'react';
import { User } from 'firebase/auth';
import { addDoc, CollectionReference, DocumentData, serverTimestamp } from 'firebase/firestore';
import { RiSendPlane2Line } from 'react-icons/ri';
import uniqid from 'uniqid';
import FirebaseContext from '../FirebaseContext';
import Button from './Button';

function Form() {
  const { user, messageCollection } = useContext(FirebaseContext);
  const [text, setText] = useState('');
  const sendMessage = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!text) return;
    const { uid, photoURL } = user as User;
    setText('');
    await addDoc(
      messageCollection as CollectionReference<DocumentData>,
      {
        id: uniqid(),
        text,
        timestamp: serverTimestamp(),
        userId: uid,
        photoURL,
      });
  };

  return (
    <form className="Form" onSubmit={sendMessage}>
      <input
        type="text"
        placeholder={user ? 'Message' : 'Sign in to chat'}
        maxLength={400}
        value={user ? text : ''}
        onChange={({ target: { value } }) => setText(value)}
        disabled={!user}
      />
      <Button
        type="submit"
        title="Send"
        onMouseDown={(e) => e.preventDefault()}
        disabled={!user}
      >
        <RiSendPlane2Line />
      </Button>
    </form>
  );
}

export default Form;
