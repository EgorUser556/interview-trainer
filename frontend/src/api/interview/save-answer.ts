import { request } from '../request.ts';

export const saveAnswer = async (
    sessionId: number,
    interviewQuestionId: number,
    answer: string,
) => {
    const response = await request(
        `/interview/${sessionId}/questions/${interviewQuestionId}/answer`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ answer }),
        },
    );

    return response.json();
};
