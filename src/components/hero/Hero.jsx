import "./hero.scss";
import CircularText from "../../reactBitsComponent/CircularText/CircularText";
import { motion } from "framer-motion";
import { textVariants } from "../../constants/motion";
import { useRef } from "react";

const Hero = () => {
    const imgRef = useRef(null);

    return (
        <div className="hero">
            <div className="wrapper">
                <motion.div
                    className="textContainer"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1 variants={textVariants}>Full Stack Developer 👋🏻</motion.h1>
                    <motion.h3 variants={textVariants}>
                        Hi, I'm Jia Jun. A full stack developer from 🇲🇾
                    </motion.h3>
                </motion.div>
            </div>

            <motion.div
                className="imageContainer"
                variants={textVariants}
                initial="initial"
                animate="animate"
            >
                <CircularText
                    text="JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • "
                    onHover="slowDown"
                    spinDuration={15}
                    className="circular-text"
                    targetRef={imgRef}
                    gap={20}               /* distance from image edge to ring */
                />
                <img ref={imgRef} src="/hero.png" alt="Portrait" />
            </motion.div>
        </div>
    );
};

export default Hero;
