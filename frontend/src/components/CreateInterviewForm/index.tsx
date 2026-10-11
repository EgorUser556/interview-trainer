import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

import { LEVEL, QUANTITY, TOPIC } from './config';
import styles from './styled.module.scss';
import type { InterviewSettings } from './types';

const CreateInterviewForm = () => {
    const [settings, setSettings] = useState<InterviewSettings>({
        topic: TOPIC.JS,
        level: LEVEL.Junior,
        quantity: QUANTITY.Five,
    });

    const [submittedSettings, setSubmittedSettings] =
        useState<InterviewSettings | null>(null);

    const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const topic = event.currentTarget.value;

        if (topic !== TOPIC.JS && topic !== TOPIC.TS && topic !== TOPIC.React) {
            return;
        }

        setSettings((prev) => ({
            ...prev,
            topic,
        }));
    };

    const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const level = event.currentTarget.value;

        if (level !== LEVEL.Junior && level !== LEVEL.Middle) return;

        setSettings((prev) => ({
            ...prev,
            level,
        }));
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const quantity = Number(event.currentTarget.value);

        if (quantity !== QUANTITY.Five && quantity !== QUANTITY.Ten) return;

        setSettings((prev) => ({
            ...prev,
            quantity,
        }));
    };

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedSettings(settings);
    };

    return (
        <div className={styles.wrapper}>
            <section className={styles.card}>
                <h2 className={styles.title}>Новое интервью</h2>
                <p className={styles.description}>
                    Выбери параметры для своей тренировки.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="interview-topic"
                            >
                                Тема
                            </label>
                            <select
                                className={styles.select}
                                id="interview-topic"
                                value={settings.topic}
                                onChange={handleTopicChange}
                            >
                                <option value={TOPIC.JS}>JavaScript</option>
                                <option value={TOPIC.TS}>TypeScript</option>
                                <option value={TOPIC.React}>React</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="interview-level"
                            >
                                Уровень
                            </label>
                            <select
                                className={styles.select}
                                id="interview-level"
                                value={settings.level}
                                onChange={handleLevelChange}
                            >
                                <option value={LEVEL.Junior}>Junior</option>
                                <option value={LEVEL.Middle}>Middle</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor="interview-quantity"
                            >
                                Количество вопросов
                            </label>
                            <select
                                className={styles.select}
                                id="interview-quantity"
                                value={settings.quantity}
                                onChange={handleQuantityChange}
                            >
                                <option value={QUANTITY.Five}>
                                    {QUANTITY.Five}
                                </option>
                                <option value={QUANTITY.Ten}>
                                    {QUANTITY.Ten}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button className={styles.button} type="submit">
                        Начать интервью
                    </button>

                    <p className={styles.hint}>
                        После завершения будут доступны объяснения и
                        самопроверка.
                    </p>
                </form>
            </section>

            {submittedSettings !== null && (
                <section className={styles.result} aria-live="polite">
                    <h2 className={styles.resultTitle}>Настройки интервью</h2>
                    <dl className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <dt>Тема</dt>
                            <dd>{submittedSettings.topic}</dd>
                        </div>
                        <div className={styles.summaryRow}>
                            <dt>Уровень</dt>
                            <dd>{submittedSettings.level}</dd>
                        </div>
                        <div className={styles.summaryRow}>
                            <dt>Количество вопросов</dt>
                            <dd>{submittedSettings.quantity}</dd>
                        </div>
                    </dl>
                </section>
            )}
        </div>
    );
};

export default CreateInterviewForm;
