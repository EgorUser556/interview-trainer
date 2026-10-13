import { useMutation } from '@tanstack/react-query';
import { type ChangeEvent, type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createInterview } from '../api/interview/create-interview';
import {
    LEVEL,
    QUANTITY,
    TOPIC,
} from '../components/CreateInterviewForm/config';
import type { InterviewSettings } from '../components/CreateInterviewForm/types';

export const useCreateInterviewForm = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState<InterviewSettings>({
        topic: TOPIC.JS,
        level: LEVEL.Junior,
        quantity: QUANTITY.Five,
    });

    const createInterviewMutation = useMutation({
        mutationFn: createInterview,

        onSuccess: (interview) => {
            navigate(`/interview/${interview.id}`);
        },

        onError: (error) => {
            throw new Error(error.message);
        },
    });

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

        if (createInterviewMutation.isPending) {
            return;
        }

        createInterviewMutation.mutate(settings);
    };

    return {
        settings,
        isSubmitting: createInterviewMutation.isPending,
        error: createInterviewMutation.error?.message ?? null,
        handleTopicChange,
        handleLevelChange,
        handleQuantityChange,
        handleSubmit,
    };
};
