import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import DecryptedText from "../../reactBitsComponent/DecryptedText/DecryptedText";
import useCoarsePointer from "../../hooks/useCoarsePointer";
import "./contact.scss";

const Contact = () => {
    const coarse = useCoarsePointer();
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
        <div className="contact">
            <div className="textContainer">
                <h1>Let's work together</h1>

                <div className="item">
                    <h2>Mail</h2>
                    <DecryptedText
                        text="kongjiajun040103@gmail.com"
                        characters="ABCD1234!?"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        revealDirection="start"
                        animateOn={coarse ? "hover" : "view"}
                        speed={60}
                        maxIterations={10}
                        sequential
                    />
                </div>

                <div className="item">
                    <h2>Phone</h2>
                    <DecryptedText
                        text="+44 07917 997 042"
                        characters="ABCD1234!?"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                        revealDirection="start"
                        animateOn={coarse ? "hover" : "view"}
                        speed={60}
                        maxIterations={10}
                        sequential
                    />
                </div>
            </div>

            <div className="formContainer">
                <form
                    ref={formRef}
                    onSubmit={sendEmail}
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
                </form>
            </div>
        </div>
    );
};

export default Contact;
