import CreateInterviewForm from '../../components/CreateInterviewForm';
import Header from '../../components/Header';
import TrainingSteps from '../../components/TrainingSteps';
import styles from './styled.module.scss';

const HomePage = () => {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.intro}>
                        <h1 className={styles.title}>
                            Подготовься к следующему собеседованию
                        </h1>
                        <p className={styles.description}>
                            Ответь на технические вопросы, сравни ответы с
                            объяснениями и найди темы для повторения.
                        </p>
                    </div>
                    <div className={styles.content}>
                        <CreateInterviewForm />
                        <TrainingSteps />
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;
