import styled from './styled.module.scss';

const InterviewSkeleton = () => {
    return (
        <div className={styled.card}>
            <p className={styled.title}>Загрузка...</p>

            <div className={styled.content} aria-hidden="true">
                <div className={`${styled.placeholder} ${styled.short}`} />
                <div className={`${styled.placeholder} ${styled.long}`} />
                <div className={`${styled.placeholder} ${styled.medium}`} />

                <div className={`${styled.placeholder} ${styled.answer}`} />
            </div>
        </div>
    );
};

export default InterviewSkeleton;
