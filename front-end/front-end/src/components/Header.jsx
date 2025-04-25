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



// const Header = ({onAddNote}) => {
    
//     return (
//         <header className='appHeader'>
//             <h1>Cloud Notes</h1>
//             <div>
                
//                 <button onClick={onAddNote} className='addNoteBtn'>
//                     Add Note
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;