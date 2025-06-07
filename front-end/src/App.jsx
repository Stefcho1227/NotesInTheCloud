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
import {getUID} from "./api/authApi.js";

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
                                const response = await fetchNotes(getUID());
                                return response.data;
                            } catch (error) {
                                console.log(error.message);
                                return [];
                            }
                        },
                        children:[
                            {
                                path: ":id",
                                element: <NoteEditorPage />,
                                loader: async ({ params }) => {
                                    try {
                                        console.log('note id in loader: ', params.id)
                                        const response = await fetchNote(params.id);
                                        if (response.status >= 400) {
                                            throw new Error("Could not load note");
                                        }
                                        return response.data;
                                    } catch (error) {
                                        return { error: error.message };
                                    }
                                },
                            }
                        ]
                    },
                    {
                        path: "notes/new",
                        element: <NoteEditorPage />,
                        loader: async () => null
                    },
                    {
                        path: "todos",
                        element: <ToDoListPage />,
                        loader: async () => {
                            try {
                                const response = await fetchToDos(getUID());
                                if (response.status >= 400) {
                                    throw new Error("Could not load to-dos");
                                }
                                return response.data;
                            } catch (error) {
                                console.log(error.message);
                                return [];
                            }
                        },
                        children:[
                            {
                                path: ":id",
                                element: <ToDoEditorPage />,
                                loader: async ({ params }) => {
                                    try {
                                        const response = await fetchToDo(params.id);
                                        if (response.status >= 400) {
                                            throw new Error("Could not load to-do");
                                        }
                                        return response.data;
                                    } catch (error) {
                                        return { error: error.message };
                                    }
                                },
                            },
                        ]
                    },
                    {
                        path: "todos/new",
                        element: <ToDoEditorPage />,
                        loader: async () => null
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