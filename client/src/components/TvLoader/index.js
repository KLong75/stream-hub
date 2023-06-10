import { motion } from 'framer-motion';
import { ReactComponent as LedTvSvg } from '../../assets/images/ledTv.svg';

const TvLoader = () => {
  return (
    <>
    <motion.div animate={{ x:100, opacity: 1}} transition={{ ease: "easeOut", duration: 2 }}
    initial={{ opacity: 0 }}
      
      exit={{ opacity: 0 }}
    
    ><LedTvSvg 
       width='300' height='300'>Get the popcorn ready!
    </LedTvSvg> 
    </motion.div>
    </>
  );
};

export default TvLoader;