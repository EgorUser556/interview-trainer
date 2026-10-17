import { request } from '../request';

export const SaveRating = async (
    sessionId: number,
    interviewQuestionId: number,
    rating: string,
) => {
    const response = await request(
        `/interview/${sessionId}/questions/${interviewQuestionId}/rating`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ selfRating: rating }),
        },
    );

    return await response.json();
};
