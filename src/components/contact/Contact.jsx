import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import DecryptedText from "../../reactBitsComponent/DecryptedText/DecryptedText";
import "./contact.scss";

const variants = {
    initial: { y: 100, opacity: 0 },
    animate: {
        y: 0, opacity: 1,
        transition: { duration: 0.5, staggerChildren: 0.1 },
    },
};

const Contact = () => {
    const formRef = useRef(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSuccess(false);
        setError(false);
        setLoading(true);
        emailjs
            .sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => { setLoading(false); setSuccess(true); },
                () => { setLoading(false); setError(true); }
            );
    };

    return (
        <motion.div className="contact" variants={variants} initial="initial" whileInView="animate">
            <motion.div className="textContainer" variants={variants}>
                <motion.h1 variants={variants}>Let's work together</motion.h1>

                <motion.div className="item" variants={variants}>
                    <h2>Mail</h2>
                    <DecryptedText
                        text="kongjiajun040103@gmail.com"
                        characters="ABCD1234!?"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        revealDirection="start"
                        animateOn="view"
                        speed={60}
                        maxIterations={10}
                        sequential
                    />
                </motion.div>

                <motion.div className="item" variants={variants}>
                    <h2>Phone</h2>
                    <DecryptedText
                        text="+44 07917 997 042"
                        characters="ABCD1234!?"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        revealDirection="start"
                        animateOn="view"
                        speed={60}
                        maxIterations={10}
                        sequential
                    />
                </motion.div>
            </motion.div>

            <div className="formContainer">
                <motion.form
                    ref={formRef}
                    onSubmit={sendEmail}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <input type="text" name="user_name" placeholder="Name" autoComplete="name" required />
                    <input type="email" name="user_email" placeholder="Email" autoComplete="email" required />
                    <textarea rows={8} name="message" placeholder="Message" />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Submit"}
                    </button>

                    <div className="message-state" role="status" aria-live="polite">
                        {error && "Something went wrong 🥲"}
                        {success && "Message sent successfully ✅"}
                    </div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default Contact;
