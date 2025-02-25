import { motion } from "framer-motion";

const ToggleButton = ({ setOpen }) => {
  return (
    <button onClick={() => setOpen((prev) => !prev)} style={{ background: "transparent", border: "none" }}>
      <svg width="30" height="30" viewBox="0 0 24 24">
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 4 6 L 20 6" },
            open: { d: "M 5 18 L 19 6" }, 
          }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          d="M 4 12 L 20 12"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        />
        <motion.path
          strokeWidth="3"
          stroke="white"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 4 18 L 20 18" },
            open: { d: "M 5 6 L 19 18" }, 
          }}
        />
      </svg>
    </button>
  );
};

export default ToggleButton;
