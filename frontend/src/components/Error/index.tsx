import errorIcon from '../../assets/icons/error.svg';
import styled from './styled.module.scss';

type ErrorProps = {
    onRetry: () => void;
    isRetrying: boolean;
};

const Error = ({ onRetry, isRetrying }: ErrorProps) => {
    return (
        <div className={styled.card}>
            <h2 className={styled.title}>Не удалось загрузить интервью</h2>

            <div className={styled.content}>
                <img src={errorIcon} alt="" className={styled.icon} />

                <p className={styled.description}>
                    Не удалось загрузить интервью. Проверьте соединение и
                    попробуйте ещё раз.
                </p>

                <button
                    type="button"
                    className={styled.button}
                    onClick={onRetry}
                    disabled={isRetrying}
                >
                    {isRetrying ? 'Пробуем снова...' : 'Попробовать снова'}
                </button>
            </div>
        </div>
    );
};

export default Error;
