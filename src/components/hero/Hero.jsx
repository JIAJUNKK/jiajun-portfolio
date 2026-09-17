import "./hero.scss";
import CircularText from "../../reactBitsComponent/CircularText/CircularText";
import { m } from "framer-motion";
import { textVariants } from "../../constants/motion";
import { useRef } from "react";
import useCoarsePointer from "../../hooks/useCoarsePointer";

const Hero = () => {
    const imgRef = useRef(null);
    const coarse = useCoarsePointer();
    const introVariants = coarse
        ? {
            initial: { y: 24, opacity: 0 },
            animate: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, staggerChildren: 0.1 },
            },
        }
        : textVariants;

    return (
        <div className="hero">
            <div className="wrapper">
                <m.div
                    className="textContainer"
                    variants={introVariants}
                    initial="initial"
                    animate="animate"
                >
                    <m.h1 variants={introVariants}>Full Stack Developer 👋🏻</m.h1>
                    <m.h3 variants={introVariants}>
                        Hi, I'm Jia Jun. A full stack developer from 🇲🇾
                    </m.h3>
                </m.div>
            </div>

            <m.div
                className="imageContainer"
                variants={introVariants}
                initial="initial"
                animate="animate"
            >
                <CircularText
                    text="JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • JIAJUN • "
                    onHover="slowDown"
                    spinDuration={15}
                    className="circular-text"
                    targetRef={imgRef}
                    gap={coarse ? 10 : 20}               /* distance from image edge to ring */
                />
                <img ref={imgRef} src="/hero.png" alt="Portrait" />
            </m.div>
        </div>
    );
};

export default Hero;
