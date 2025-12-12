// src/components/caseStudies/CaseStudyStoryTwoColumn/CaseStudyStoryTwoColumn.jsx
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyStoryTwoColumn.scss";

const CaseStudyStoryTwoColumn = ({
    eyebrow,
    title,
    introParagraphs = [],
    leftBlock,
    rightBlock,
    className = "",
}) => {
    return (
        <CaseStudySection className={`fh-body ${className}`}>
            <div className="fh-body__prose">
                {eyebrow && <p className="fh-eyebrow">{eyebrow}</p>}
                {title && <h2>{title}</h2>}
                {introParagraphs.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>

            <div className="fh-body__columns">
                {leftBlock && (
                    <div className="fh-body__block">
                        {leftBlock.title && <h3>{leftBlock.title}</h3>}
                        {leftBlock.body && <p>{leftBlock.body}</p>}
                        {Array.isArray(leftBlock.bullets) &&
                            leftBlock.bullets.length > 0 && (
                                <ul>
                                    {leftBlock.bullets.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                    </div>
                )}

                {rightBlock && (
                    <div className="fh-body__block">
                        {rightBlock.title && <h3>{rightBlock.title}</h3>}
                        {rightBlock.body && <p>{rightBlock.body}</p>}
                        {Array.isArray(rightBlock.bullets) &&
                            rightBlock.bullets.length > 0 && (
                                <ul>
                                    {rightBlock.bullets.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                    </div>
                )}
            </div>
        </CaseStudySection>
    );
};

export default CaseStudyStoryTwoColumn;
