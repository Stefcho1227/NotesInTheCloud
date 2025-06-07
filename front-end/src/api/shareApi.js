// api/shareApi.js  (new file, or add to notesApi.js)

import api from "./axiosConfig";

export const createShare = (noteId, targetUserId, perm = "READ") =>
    api.post("/shares", { noteId, targetUserId, perm });

export const fetchSharedNotes = userId =>
    api.get(`/shares/shared/${userId}`);
