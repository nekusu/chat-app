import { useContext, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionReference, DocumentData, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { RiChat1Line } from 'react-icons/ri';
import FirebaseContext from '../FirebaseContext';
import { Form, Loading, Message, SignIn, SignOut } from './index';

function Chat() {
  const { user, messageCollection } = useContext(FirebaseContext);
  const messageQuery = query(
    messageCollection as CollectionReference<DocumentData>,
    orderBy('timestamp', 'asc'),
  );
  const [messages, loading] = useCollectionData(messageQuery);
  const bottom = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => bottom.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="Chat"
    >
      <header>
        <h1><RiChat1Line /> Chat</h1>
        {user ? <SignOut /> : <SignIn />}
      </header>
      {loading
        ? <Loading />
        : <motion.div layoutScroll className="Messages">
          <div id="top" />
          <AnimatePresence>
            {messages?.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </AnimatePresence>
          <div ref={bottom} />
        </motion.div>
      }
      <Form />
    </motion.div>
  );
}

export default Chat;
