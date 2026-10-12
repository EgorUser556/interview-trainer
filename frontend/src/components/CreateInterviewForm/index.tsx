import { useCreateInterviewForm } from '../../hooks/useCreateInterviewForm.ts';
import { LEVEL, QUANTITY, TOPIC } from './config';
import styles from './styled.module.scss';

const CreateInterviewForm = () => {
    const {
        settings,
        isSubmitting,
        error,
        handleTopicChange,
        handleLevelChange,
        handleQuantityChange,
        handleSubmit,
    } = useCreateInterviewForm();

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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Создаём интервью…' : 'Начать интервью'}
                    </button>

                    {error !== null && <p>{error}</p>}

                    <p className={styles.hint}>
                        После каждого ответа сравни его с объяснением и оцени
                        свои знания.
                    </p>
                </form>
            </section>
        </div>
    );
};

export default CreateInterviewForm;
