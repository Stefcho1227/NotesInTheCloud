export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMsg = 'API request failed';
        try {
            const error = await response.text();
            errorMsg = error.message || errorMsg;
        } catch {
            errorMsg = `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorMsg);

    }
    return response.json();
};