import { useContext } from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import FirebaseContext from '../FirebaseContext';
import Button from './Button';

function SignOut() {
  const { auth } = useContext(FirebaseContext);

  return (
    <Button onClick={() => auth?.signOut()}>
      <RiLogoutCircleLine /> Sign out
    </Button>
  );
}

export default SignOut;
