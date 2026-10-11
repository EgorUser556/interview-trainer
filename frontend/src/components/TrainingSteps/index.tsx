import { STEPS } from './config';
import styles from './styled.module.scss';
import type { Step } from './types.ts';

const TrainingSteps = () => {
    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>Как проходит тренировка</h2>

            <ol className={styles.list}>
                {STEPS.map(({ id, name, description }: Step) => (
                    <li className={styles.item} key={id}>
                        <span className={styles.number} aria-hidden="true">
                            {id}
                        </span>

                        <div className={styles.content}>
                            <h3 className={styles.stepTitle}>{name}</h3>
                            <p className={styles.description}>{description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
};

export default TrainingSteps;
