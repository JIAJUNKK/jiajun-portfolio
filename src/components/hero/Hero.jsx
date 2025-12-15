import "./hero.scss";
import CircularText from "../../reactBitsComponent/CircularText/CircularText";
import { m } from "framer-motion";
import { textVariants } from "../../constants/motion";
import { useRef } from "react";

const Hero = () => {
    const imgRef = useRef(null);

    return (
        <div className="hero">
            <div className="wrapper">
                <m.div
                    className="textContainer"
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                >
                    <m.h1 variants={textVariants}>Full Stack Developer 👋🏻</m.h1>
                    <m.h3 variants={textVariants}>
                        Hi, I'm Jia Jun. A full stack developer from 🇲🇾
                    </m.h3>
                </m.div>
            </div>

            <m.div
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
            </m.div>
        </div>
    );
};

export default Hero;
