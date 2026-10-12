import type { InterviewSettings } from '../components/CreateInterviewForm/types';
import { request } from './request';

export const createInterview = async (settings: InterviewSettings) => {
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
