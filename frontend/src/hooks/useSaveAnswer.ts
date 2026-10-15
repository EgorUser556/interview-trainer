import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveAnswer } from '../api/interview/save-answer';

type SaveAnswerVariables = {
    interviewQuestionId: number;
    answer: string;
};

export const useSaveAnswer = (sessionId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ interviewQuestionId, answer }: SaveAnswerVariables) =>
            saveAnswer(sessionId, interviewQuestionId, answer),

        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ['interview', sessionId],
            });
        },
    });
};
