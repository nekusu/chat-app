import { useContext, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionReference, DocumentData, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import FirebaseContext from '../FirebaseContext';
import { Form, Github, Loading, Message, SignIn, SignOut } from './index';

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
        <Github username="nekusu" />
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
