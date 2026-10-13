import { Link } from 'react-router-dom';

import leftArrow from '../../assets/icons/left-arrow.svg';
import AnswerInterviewForm from '../../components/AnswerInterviewForm';
import Header from '../../components/Header';
import styled from './styled.module.scss';

const InterviewPage = () => {
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
                            <span className={styled.topic}>JavaScript</span>
                            <span className={styled.level}>Middle</span>
                        </div>
                    </div>
                    <div className={styled.completeInfo}>
                        <p>Вопрос 2 из 5</p>
                        <progress
                            className={styled.progress}
                            value={1}
                            max={5}
                        />
                    </div>
                    <div className={styled.question}>
                        <span className={styled.questionNumber}>Вопрос 2</span>
                        <h2 className={styled.questionText}>
                            Чем отличаются let, const и var? Объясни область
                            видимости, поднятие и ограничения при повторном
                            объявлении.
                        </h2>
                        <AnswerInterviewForm />
                    </div>
                </div>
            </main>
        </>
    );
};

export default InterviewPage;
