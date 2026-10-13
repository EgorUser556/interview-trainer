import styled from './styled.module.scss';

const AnswerInterviewForm = () => {
    return (
        <form className={styled.answerForm}>
            <label htmlFor="interview-answer" className={styled.answerLabel}>
                Твой ответ
            </label>
            <textarea
                placeholder="Объясни своими словами. При необходимости добавь пример кода"
                id="interview-answer"
                name="answer"
                className={styled.answerInput}
            />
            <p className={styled.hint} id="interview-answer-hint">
                <span className={styled.hintIcon} aria-hidden="true">
                    i
                </span>

                <span>
                    Сначала ответь самостоятельно — затем сравни с объяснением
                </span>
            </p>
            <button type="submit" className={styled.sendButton}>
                Отправить ответ
            </button>
        </form>
    );
};

export default AnswerInterviewForm;
