import React, { useEffect, useState } from "react";
import "./UserPickerDialog.css";               
import { fetchAllUsers } from "../api/userApi";

export default function UserPickerDialog({ onSelect, onClose }) {
    const [users, setUsers] = useState([]);
    const [term, setTerm]   = useState("");

    useEffect(() => {
        fetchAllUsers()
            .then(r => setUsers(r.data))
            .catch(() => setUsers([]));
    }, []);

    const filtered = users.filter(
        u => u.username.toLowerCase().includes(term.toLowerCase())
    );

    return (
        <div className="up-backdrop" onClick={onClose}>
            <div className="up-modal" onClick={e => e.stopPropagation()}>
                <h3>Share with…</h3>

                <input
                    placeholder="Search user"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    className="up-search"
                />

                <ul className="up-list">
                    {filtered.map(u => (
                        <li key={u.id} onClick={() => onSelect(u)}>
                            {u.username}
                        </li>
                    ))}
                </ul>

                <button onClick={onClose} className="up-close">Close</button>
            </div>
        </div>
    );
}
