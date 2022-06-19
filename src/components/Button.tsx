import { HTMLMotionProps, motion } from 'framer-motion';

function Button({ children, className = '', type = 'button', ...rest }: HTMLMotionProps<'button'>) {
  return (
    <motion.button
      whileTap={{ scale: 0.925, transition: { duration: 0.15 } }}
      className={`Button ${className}`}
      type={type}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default Button;
