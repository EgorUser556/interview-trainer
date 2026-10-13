import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getInterview } from '../api/interview/get-interview';

export const useInterview = () => {
    const [currentIndex] = useState(0);
    const [readyInterviewId, setReadyInterviewId] = useState<number | null>(
        null,
    );
    const { interviewId } = useParams<{ interviewId: string }>();

    const id = Number(interviewId);
    const isValidId = Number.isSafeInteger(id) && id > 0;

    useEffect(() => {
        if (!isValidId) return;

        const timer = window.setTimeout(() => {
            setReadyInterviewId(id);
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [id, isValidId]);

    const interviewQuery = useQuery({
        queryKey: ['interview', id],
        queryFn: () => getInterview(id),
        enabled: isValidId,
    });

    const questions = [...(interviewQuery.data?.questions ?? [])].sort(
        (a, b) => a.position - b.position,
    );

    const currentQuestion = questions[currentIndex];
    const isLoading = interviewQuery.isPending || readyInterviewId !== id;

    return {
        isValidId,
        interviewQuery,
        isLoading,
        currentQuestion,
        totalQuestions: questions.length,
    };
};
