import { request } from '../request';

export const getInterview = async (id: number) => {
    const response = await request(`/interview/${id}`);

    return response.json();
};
