import { useContext } from 'react';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { RiGoogleFill } from 'react-icons/ri';
import FirebaseContext from '../FirebaseContext';
import Button from './Button';

const provider = new GoogleAuthProvider();

function SignIn() {
  const { auth } = useContext(FirebaseContext);
  const signInWithGoogle = () => {
    signInWithPopup(auth as Auth, provider);
  };

  return (
    <Button onClick={signInWithGoogle}>
      <RiGoogleFill /> Sign in with Google
    </Button>
  );
}

export default SignIn;
