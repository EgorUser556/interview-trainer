const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    throw new Error('Не задана переменная VITE_API_URL');
}

export const request = async (
    path: string,
    options: RequestInit = {},
): Promise<Response> => {
    const url: string = `${API_URL}${path}`;

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}, statusText: ${response.statusText}`,
        );
    }

    return response;
};
