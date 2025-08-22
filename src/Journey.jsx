import { motion } from 'framer-motion';
import './index.css';  // make sure this is imported if not already!

export default function Journey() {
  return (
    <div style={styles.screen}>
      <motion.h1
        className="font-press"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={styles.title}
      >
        Journey
      </motion.h1>

      <motion.p
        className="font-vt323"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={styles.subtitle}
      >
        Make today count
      </motion.p>

      <motion.p
        className="font-press"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={styles.footer}
      >
        Press to continue
      </motion.p>
    </div>
  );
}

const styles = {
  screen: {
    height: '100vh',
    width: '100vw',
    background: '#000814',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  footer: {
    fontSize: '1rem',
    marginTop: 'auto',
    paddingBottom: '2rem',
  },
};
