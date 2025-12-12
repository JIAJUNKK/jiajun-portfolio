// src/components/caseStudies/CaseStudyWorkflow/CaseStudyWorkflow.jsx
import CaseStudySection from "../CaseStudySection/CaseStudySection";
import "./CaseStudyWorkflow.scss";

const CaseStudyWorkflow = ({ eyebrow, title, intro, steps = [] }) => {
    return (
        <CaseStudySection className="fh-workflow">
            <div className="fh-section-header">
                {eyebrow && <p className="fh-eyebrow">{eyebrow}</p>}
                {title && <h2>{title}</h2>}
                {intro && <p>{intro}</p>}
            </div>

            <ol className="fh-steps">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </CaseStudySection>
    );
};

export default CaseStudyWorkflow;
