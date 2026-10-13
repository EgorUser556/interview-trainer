import type { InterviewSettings } from '../../components/CreateInterviewForm/types.ts';
import { request } from '../request.ts';
import type { CreateInterviewResponse } from './types';

export const createInterview = async (
    settings: InterviewSettings,
): Promise<CreateInterviewResponse> => {
    const payload = {
        topic: settings.topic,
        level: settings.level,
        questionCount: settings.quantity,
    };

    const response = await request('/interview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    return await response.json();
};
