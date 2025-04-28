import {DEFAULT_HEADERS, handleResponse} from './apiConfig';

// export const fetchNotes = async () => {
//     const response = await fetch(`${API_BASE}/notes`, {
//         headers: DEFAULT_HEADERS,
//         credentials: 'include' // For session cookies
//     });
//     return handleResponse(response);
// };

export const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        headers: {
            ...DEFAULT_HEADERS,
            ...options.headers
        },
        credentials: 'include' // For session cookies
    });
    return await handleResponse(response);
};


// In noteService.js
// In noteService.js
export const fetchNotes = async () => {
    const response = await fetch('/api/notes'); // Note: using /api prefix

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
    }

    return response.json();
};
export const fetchNoteById = async (id) => {
    // const response = await fetch(`${API_BASE}/notes/${id}`, {
    //     headers: DEFAULT_HEADERS,
    //     credentials: 'include'
    // });
    // return handleResponse(response);

    return await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/notes/${id}`);
};

export const createNote = async (noteData) => {
    // const response = await fetch(`${API_BASE}/notes`,{
    //     method:'POST',
    //     headers: DEFAULT_HEADERS,
    //     body: JSON.stringify({
    //         title: noteData.title,
    //         content: noteData.content,
    //         isPublic: noteData.isPublic || false,
    //         ownerId: noteData.ownerId || 1 //possibly wrong
    //     }),
    //     credentials: 'include'
    // });
    // return handleResponse(response);

    return await fetchWithAuth(`${API_BASE}/notes`, {
        method:'POST',
        body: JSON.stringify({
            title: noteData.title,
            content: noteData.content,
            isPublic: noteData.isPublic || false,
            ownerId:  1
        }),
    });
};

export const updateNote = async (id, noteData) => {
    return fetchWithAuth(`${API_BASE}/notes/${id}`,{
        method:'PUT',
        body: JSON.stringify({
            title: noteData.title,
            content: noteData.content,
            isPublic: noteData.isPublic || false
        })
    });

    // const response = await fetch(`${API_BASE}/notes/${id}`,{
    //     method:'PUT',
    //     headers: DEFAULT_HEADERS,
    //     body: JSON.stringify({
    //         title: noteData.title,
    //         content: noteData.content,
    //         isPublic: noteData.isPublic || false
    //     }),
    //     credentials: 'include'
    // });
    // return handleResponse(response);
};

export const deleteNote = async (id) => {
    return await fetchWithAuth(`${API_BASE}/notes/${id}`,{
        method:'DELETE'
    });

    // const response = await fetch(`${API_BASE}/notes/${id}`,{
    //     method:'DELETE',
    //     headers: DEFAULT_HEADERS,
    //     credentials: 'include'
    // });
    // if (response.status ===  204) return null; // No content to return
    // return handleResponse(response);
};

export const shareNote = async (noteId, userId, permission) => {
    return await fetchWithAuth(`${API_BASE}/notes-shares`,{
        method:'POST',
        body: JSON.stringify({ noteId, userId, permission}),
    });

    // const response = await fetch(`${API_BASE}/notes-shares`,{
    //     method:'POST',
    //     headers: DEFAULT_HEADERS,
    //     body: JSON.stringify({ noteID, userID, permission}),
    //     credentials: 'include'
    // });
    // return handleResponse(response);
};