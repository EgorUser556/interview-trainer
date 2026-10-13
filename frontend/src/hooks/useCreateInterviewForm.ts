import { type ChangeEvent, type SyntheticEvent, useState } from 'react';

import { createInterview } from '../api/interview/create-interview.ts';
import {
    LEVEL,
    QUANTITY,
    TOPIC,
} from '../components/CreateInterviewForm/config';
import type { InterviewSettings } from '../components/CreateInterviewForm/types';

export const useCreateInterviewForm = () => {
    const [settings, setSettings] = useState<InterviewSettings>({
        topic: TOPIC.JS,
        level: LEVEL.Junior,
        quantity: QUANTITY.Five,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const topic = event.currentTarget.value;

        if (topic !== TOPIC.JS && topic !== TOPIC.TS && topic !== TOPIC.React) {
            return;
        }

        setSettings((prev) => ({
            ...prev,
            topic,
        }));
    };

    const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const level = event.currentTarget.value;

        if (level !== LEVEL.Junior && level !== LEVEL.Middle) {
            return;
        }

        setSettings((prev) => ({
            ...prev,
            level,
        }));
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const quantity = Number(event.currentTarget.value);

        if (quantity !== QUANTITY.Five && quantity !== QUANTITY.Ten) {
            return;
        }

        setSettings((prev) => ({
            ...prev,
            quantity,
        }));
    };

    const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const interview = await createInterview(settings);
            console.log('Созданное интервью:', interview);
        } catch (e) {
            console.error(e);

            setError(
                e instanceof Error
                    ? e.message
                    : 'Не удалось создать интервью. Попробуй ещё раз.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        settings,
        isSubmitting,
        error,
        handleTopicChange,
        handleLevelChange,
        handleQuantityChange,
        handleSubmit,
    };
};
