import { createBrowserRouter, RouterProvider } from "react-router";
import { fetchNote, fetchNotes } from "./api/notesApi.js";
import { fetchToDo, fetchToDos } from "./api/toDosApi.js";
import ProtectedRoute from "./layouts/ProtectedRoutes";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import NoteListPage from "./pages/NoteListPage";
import ToDoListPage from "./pages/ToDoListPage";
import NoteEditorPage from "./pages/NoteEditorPage";
import ToDoEditorPage from "./pages/ToDoEditorPage";
import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogIn />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/app",
        element: <ProtectedRoute />,
        children: [
            {
                element: <Notes />,
                children: [
                    {
                        path: "notes",
                        element: <NoteListPage />,
                        loader: async () => {
                            try {
                                const response = await fetchNotes();
                                if (response.statusText !== 'OK') {
                                    throw new Error("Could not load notes");
                                }
                                return response.data;
                            } catch (error) {
                                return { error: error.message };
                            }
                        },
                    },
                    {
                        path: "notes/:id",
                        element: <NoteEditorPage />,
                        loader: async ({ params }) => {
                            try {
                                const response = await fetchNote(params.id);
                                if (response.statusText !== 'OK') {
                                    throw new Error("Could not load note");
                                }
                                return response.data;
                            } catch (error) {
                                return { error: error.message };
                            }
                        },
                    },
                    {
                        path: "notes/new",
                        element: <NoteEditorPage />,
                    },
                    {
                        path: "todos",
                        element: <ToDoListPage />,
                        loader: async () => {
                            try {
                                const response = await fetchToDos();
                                if (response.statusText !== 'OK') {
                                    throw new Error("Could not load to-dos");
                                }
                                return response.data;
                            } catch (error) {
                                return { error: error.message };
                            }
                        },
                    },
                    {
                        path: "todos/:id",
                        element: <ToDoEditorPage />,
                        loader: async ({ params }) => {
                            try {
                                const response = await fetchToDo(params.id);
                                if (response.statusText !== 'OK') {
                                    throw new Error("Could not load to-do");
                                }
                                return response.data;
                            } catch (error) {
                                return { error: error.message };
                            }
                        },
                    },
                    {
                        path: "todos/new",
                        element: <ToDoEditorPage />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;