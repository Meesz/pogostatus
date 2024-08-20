import { motion } from "framer-motion";

interface ButtonProps {
  isInUse: boolean;
  toggleStatus: () => void;
}

const Button: React.FC<ButtonProps> = ({ isInUse, toggleStatus }) => {
  return (
    <motion.button
      className={`${
        isInUse
          ? "bg-green-500 hover:bg-green-700"
          : "bg-red-500 hover:bg-red-700"
      } text-white font-bold py-3 px-6 rounded-lg text-lg sm:text-xl`}
      onClick={toggleStatus}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isInUse ? "Vrijgeven" : "Bezet zetten"}
    </motion.button>
  );
};

export default Button;
