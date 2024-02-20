import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MealList from './containers/MealList/MealList';
import MealEdit from './containers/MealEdit/MealEdit';

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MealList />} />
                <Route path="/add-meal" element={<MealEdit />} />
                <Route path="/edit-meal/:id" element={<MealEdit />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    );
};

export default App;
