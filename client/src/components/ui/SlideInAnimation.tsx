import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

const SlideInAnimation = ({ children }: Props) => {
  return (
    <motion.div
      initial={{
        y: "5%",
        opacity: 0,
      }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}>
      {children}
    </motion.div>
  );
};

export default SlideInAnimation;
