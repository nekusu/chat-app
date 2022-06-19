import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CollectionReference, deleteDoc, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { RiDeleteBin6Line, RiFileCopyLine } from 'react-icons/ri';
import FirebaseContext from '../FirebaseContext';
import Button from './Button';

function Message({ message }: { message: DocumentData }) {
  const { id, text, timestamp, userId, photoURL } = message;
  const { user, messageCollection } = useContext(FirebaseContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const isOwnMessage = userId === user?.uid;
  const dateTime = timestamp?.seconds ? new Date(timestamp.seconds * 1000) : null;
  const date = dateTime?.toDateString();
  const time = dateTime?.toTimeString().split(':').slice(0, 2).join(':');
  const translateX = isOwnMessage ? 60 : -60;
  const variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  };
  const deleteMessage = async () => {
    const messageQuery = query(
      messageCollection as CollectionReference<DocumentData>,
      where('id', '==', id),
    );
    const docs = await getDocs(messageQuery);
    docs.forEach((doc) => deleteDoc(doc.ref));
  };

  return (
    <motion.div
      layout
      initial={{ x: translateX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: translateX, opacity: 0, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onTap={() => setIsExpanded((isExpanded) => !isExpanded)}
      className={`Message ${isOwnMessage ? 'sent' : 'received'}`}
    >
      <AnimatePresence>
        {isExpanded && <>
          <Button
            variants={variants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.2 }}
            onClick={() => navigator.clipboard.writeText(text)}
            title="Copy text"
          >
            <RiFileCopyLine />
          </Button>
          {isOwnMessage && (
            <Button
              variants={variants}
              initial="initial"
              animate="in"
              exit="out"
              transition={{ duration: 0.2 }}
              onClick={deleteMessage}
              title="Delete"
            >
              <RiDeleteBin6Line />
            </Button>
          )}
        </>}
      </AnimatePresence>
      <img src={photoURL} />
      <div className="Text">
        <p>
          {text}
          {time && (
            <motion.span
              variants={variants}
              initial="initial"
              animate="in"
              className="Time"
              title={date}
            >
              {time}
            </motion.span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

export default Message;
