import { useState } from 'react';

import { options } from './config';
import styled from './styled.module.scss';

const SelfRatingForm = () => {
    const [mark, setMark] = useState<string | null>(null);

    return (
        <form className={styled.form}>
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
                Следующий вопрос
            </button>
        </form>
    );
};

export default SelfRatingForm;
