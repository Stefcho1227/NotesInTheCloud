import React, { useEffect, useState } from "react";
import "./UserPickerDialog.css";
import { fetchAllUsers } from "../api/userApi";

export default function UserPickerDialog({ onSelect, onClose }) {
    const [users, setUsers] = useState([]);
    const [term, setTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [permission, setPermission] = useState("READ");

    useEffect(() => {
        fetchAllUsers()
            .then(r => setUsers(r.data))
            .catch(() => setUsers([]));
    }, []);

    const filtered = users.filter(
        u => u.username.toLowerCase().includes(term.toLowerCase())
    );

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleShare = () => {
        if (selectedUser) {
            onSelect(selectedUser, permission);
            onClose();
        }
    };

    return (
        <div className="up-backdrop" onClick={onClose}>
            <div className="up-modal" onClick={e => e.stopPropagation()}>
                <h3>Share with...</h3>

                <input
                    placeholder="Search user"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    className="up-search"
                />

                <div className="up-content">
                    <ul className="up-list">
                        {filtered.map(u => (
                            <li
                                key={u.id}
                                className={selectedUser?.id === u.id ? 'selected' : ''}
                                onClick={() => handleUserSelect(u)}
                            >
                                {u.username}
                            </li>
                        ))}
                    </ul>

                    {selectedUser && (
                        <div className="permission-section">
                            <h4>Permissions for {selectedUser.username}</h4>
                            <div className="permission-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="permission"
                                        value="READ"
                                        checked={permission === "READ"}
                                        onChange={() => setPermission("READ")}
                                    />
                                    Read only
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="permission"
                                        value="EDIT"
                                        checked={permission === "EDIT"}
                                        onChange={() => setPermission("EDIT")}
                                    />
                                    Can edit
                                </label>
                            </div>
                            <button
                                className="share-confirm-btn"
                                onClick={handleShare}
                            >
                                Share with {selectedUser.username}
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={onClose} className="up-close">Close</button>
            </div>
        </div>
    );
}