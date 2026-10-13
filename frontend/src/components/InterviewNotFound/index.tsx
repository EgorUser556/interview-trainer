import { Link } from 'react-router-dom';

import fileSearch from '../../assets/icons/file-search.svg';
import styled from './styled.module.scss';

const InterviewNotFound = () => {
    return (
        <div className={styled.card}>
            <h2 className={styled.title}>Интервью не найдено</h2>

            <div className={styled.content}>
                <img
                    src={fileSearch}
                    alt="file-search"
                    className={styled.icon}
                />

                <p className={styled.description}>
                    Интервью не найдено.
                    <br />
                    Возможно, оно было удалено
                    <br />
                    или у вас нет доступа.
                </p>

                <Link to="/" className={styled.link}>
                    На главную
                </Link>
            </div>
        </div>
    );
};

export default InterviewNotFound;
