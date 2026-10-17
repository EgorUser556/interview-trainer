import { type SyntheticEvent, useState } from 'react';

import { options } from './config';
import styled from './styled.module.scss';
import type { SelfRatingFormProps } from './types';

const SelfRatingForm = ({
    OnSendRating,
    isLastQuestion,
}: SelfRatingFormProps) => {
    const [mark, setMark] = useState<string | null>(null);

    const handleAnswerSend = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (typeof mark !== 'string' || !mark.trim()) return;

        OnSendRating(mark);
    };
    return (
        <form className={styled.form} onSubmit={handleAnswerSend}>
            <h2 className={styled.title}>Самооценка</h2>

            <div className={styled.mark}>
                {options.map(({ value, label }) => (
                    <label
                        key={value}
                        className={[
                            styled.option,
                            mark === value ? styled.optionSelected : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >
                        <input
                            className={styled.radio}
                            type="radio"
                            value={value}
                            onChange={() => setMark(value)}
                            name="selfRating"
                            checked={mark === value}
                        />

                        <span>{label}</span>
                    </label>
                ))}
            </div>

            <button
                type="submit"
                className={styled.saveMark}
                disabled={mark === null}
            >
                {isLastQuestion ? 'Завершить' : 'Следующий вопрос'}
            </button>
        </form>
    );
};

export default SelfRatingForm;
