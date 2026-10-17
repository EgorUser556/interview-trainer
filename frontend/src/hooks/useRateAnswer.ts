import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SaveRating } from '../api/interview/save-rating';

type RateAnswerVariables = {
    interviewQuestionId: number;
    rating: string;
};

export const useRateAnswer = (sessionId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ interviewQuestionId, rating }: RateAnswerVariables) =>
            SaveRating(sessionId, interviewQuestionId, rating),

        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ['interview', sessionId],
            });
        },
    });
};
