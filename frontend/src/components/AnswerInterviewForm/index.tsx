import type { SyntheticEvent } from 'react';

import info from '../../assets/icons/info.svg';
import warning from '../../assets/icons/warning.svg';
import styled from './styled.module.scss';
import type { AnswerInterviewFormProps } from './types.ts';

const AnswerInterviewForm = ({
    onSendAnswer,
    isSaving,
    errorMessage,
}: AnswerInterviewFormProps) => {
    const hasError = Boolean(errorMessage) && !isSaving;
    const handleSendAnswer = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSaving) {
            return;
        }

        const formData = new FormData(e.currentTarget);
        const answer = formData.get('answer');

        if (typeof answer !== 'string' || !answer.trim()) return;

        onSendAnswer(answer.trim());
    };

    return (
        <form className={styled.answerForm} onSubmit={handleSendAnswer}>
            <label htmlFor="interview-answer" className={styled.answerLabel}>
                Твой ответ
            </label>
            <textarea
                placeholder="Объясни своими словами. При необходимости добавь пример кода"
                id="interview-answer"
                name="answer"
                className={[
                    styled.answerInput,
                    hasError ? styled.answerInputError : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                disabled={isSaving}
                required
            />
            {hasError ? (
                <p
                    className={styled.error}
                    id="interview-answer-error"
                    role="alert"
                >
                    <img
                        src={warning}
                        alt="warning"
                        className={styled.errorIcon}
                    />
                    <span>
                        Не удалось отправить ответ.
                        <br />
                        Попробуй ещё раз.
                    </span>
                </p>
            ) : (
                <p className={styled.hint} id="interview-answer-hint">
                    <img src={info} alt="" className={styled.hintIcon} />

                    <span>
                        Сначала ответь самостоятельно — затем сравни с
                        объяснением
                    </span>
                </p>
            )}
            <button
                type="submit"
                className={styled.sendButton}
                disabled={isSaving}
            >
                {isSaving
                    ? 'Сохраняем...'
                    : hasError
                      ? 'Попробовать снова'
                      : 'Отправить ответ'}
            </button>
        </form>
    );
};

export default AnswerInterviewForm;
