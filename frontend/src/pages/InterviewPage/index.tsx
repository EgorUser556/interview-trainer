import { Link } from 'react-router-dom';

import leftArrow from '../../assets/icons/left-arrow.svg';
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
                        <form className={styled.answerForm}>
                            <label
                                htmlFor="interview-answer"
                                className={styled.answerLabel}
                            >
                                Твой ответ
                            </label>
                            <textarea
                                placeholder="Объясни своими словами. При необходимости добавь пример кода"
                                id="interview-answer"
                                name="answer"
                                className={styled.answerInput}
                            />
                            <p
                                className={styled.hint}
                                id="interview-answer-hint"
                            >
                                <span
                                    className={styled.hintIcon}
                                    aria-hidden="true"
                                >
                                    i
                                </span>

                                <span>
                                    Сначала ответь самостоятельно — затем сравни
                                    с объяснением
                                </span>
                            </p>
                            <button type="submit" className={styled.sendButton}>
                                Отправить ответ
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default InterviewPage;
