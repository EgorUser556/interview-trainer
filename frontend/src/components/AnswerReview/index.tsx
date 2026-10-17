import styled from './styled.module.scss';
import type { AnswerReviewProps } from './types';

const AnswerReview = ({ answer, explanation }: AnswerReviewProps) => {
    return (
        <div className={styled.container}>
            <section className={styled.answer}>
                <h3 className={styled.title}>Твой ответ</h3>
                <p className={styled.text}>{answer}</p>
            </section>

            <section className={styled.explanation}>
                <h3 className={styled.title}>Объяснение</h3>
                <p className={styled.text}>{explanation}</p>
            </section>
        </div>
    );
};

export default AnswerReview;
