import { motion } from 'framer-motion';
import { ReactComponent as ClapboardSVG } from '../../assets/images/Clapperboard.svg';

const Clapboard = () => {
  return (
    <>
    <motion.div animate={{ x:100, opacity: 1}} transition={{ ease: "easeOut", duration: 2 }}
    initial={{ opacity: 0 }}
      
      exit={{ opacity: 0 }}
    
    
    
    ><ClapboardSVG width='300' height='300'>
    </ClapboardSVG> </motion.div>
    </>
  );
};

export default Clapboard;
