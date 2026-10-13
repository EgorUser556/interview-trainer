import { Link } from 'react-router-dom';

import leftArrow from '../../assets/icons/left-arrow.svg';
import AnswerInterviewForm from '../../components/AnswerInterviewForm';
import Error from '../../components/Error';
import Header from '../../components/Header';
import InterviewSkeleton from '../../components/Skeleton';
import { useInterview } from '../../hooks/useInterview.ts';
import styled from './styled.module.scss';

const InterviewPage = () => {
    const {
        isValidId,
        interviewQuery,
        isLoading,
        currentQuestion,
        totalQuestions,
    } = useInterview();

    if (!isValidId) {
        return <p>Некорректный ID интервью.</p>;
    }

    if (isLoading || interviewQuery.isPending) {
        return (
            <>
                <Header />

                <main className={styled.main}>
                    <div className={styled.container}>
                        <InterviewSkeleton />
                    </div>
                </main>
            </>
        );
    }

    if (interviewQuery.isError) {
        return (
            <>
                <Header />

                <main className={styled.main}>
                    <div className={styled.container}>
                        <Error
                            onRetry={() => {
                                void interviewQuery.refetch();
                            }}
                            isRetrying={interviewQuery.isFetching}
                        />
                    </div>
                </main>
            </>
        );
    }

    if (!currentQuestion) {
        return <p>В этой сессии нет доступного вопроса.</p>;
    }

    const interview = interviewQuery.data;

    return (
        <>
            <Header />
            <main className={styled.main}>
                <div className={styled.container}>
                    <Link to="/" className={styled.mainButton}>
                        <img
                            src={leftArrow}
                            alt="left-arrow"
                            className={styled.leftArrow}
                        />
                        На главную
                    </Link>
                    <div className={styled.info}>
                        <h1 className={styled.title}>Техническое интервью</h1>
                        <div className={styled.meta}>
                            <span className={styled.topic}>
                                {interview.topic}
                            </span>
                            <span className={styled.level}>
                                {interview.level}
                            </span>
                        </div>
                    </div>
                    <div className={styled.completeInfo}>
                        <p>
                            Вопрос {currentQuestion.position} из{' '}
                            {totalQuestions}
                        </p>
                        <progress
                            className={styled.progress}
                            value={1}
                            max={5}
                        />
                    </div>
                    <div className={styled.question}>
                        <span className={styled.questionNumber}>
                            Вопрос {currentQuestion.position}
                        </span>
                        <h2 className={styled.questionText}>
                            {currentQuestion.question.text}
                        </h2>
                        <AnswerInterviewForm />
                    </div>
                </div>
            </main>
        </>
    );
};

export default InterviewPage;
