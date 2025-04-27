import React from "react";
const Header = ({activeTab, onTabChange}) => {

    return (
        <header className='appHeader'>
            <div>

            <div className='tabs'>
                <button className={activeTab === 'notes' ? 'active' : ''}
                onClick={() => onTabChange('notes')}>
                    Notes
                </button>

                <button className={activeTab === 'todos' ? 'active' : ''}
                onClick={() => onTabChange('todos')}>
                    To-Do
                </button>
            </div>
            </div>
        </header>
    );
};

export default Header;