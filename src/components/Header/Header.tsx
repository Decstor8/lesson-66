import React from 'react';

interface HeaderProps {
    onAddMealClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddMealClick }) => {
    return (
        <div className="header">
            <h1>Calorie Tracker</h1>
            <button onClick={onAddMealClick} className="btn btn-primary">Add new meal</button>
        </div>
    );
};

export default Header;
