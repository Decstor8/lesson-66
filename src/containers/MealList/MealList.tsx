import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../../axiosApi';
import { Meal } from '../../types';

const MealList: React.FC = () => {
    const [meals, setMeals] = useState<Meal[] | null>(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`${API_URL}/meals`);
                setMeals(response.data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, []);

    const totalCalories = Array.isArray(meals) ? meals.reduce((total, meal) => total + meal.calories, 0) : 0;

    return (
        <div>
            <h2>Meal List</h2>
            <p>Total Calories: {totalCalories}</p>
            <Link to="/add-meal">Add new meal</Link>
            <ul>
                {Array.isArray(meals) &&
                    meals.map(meal => (
                        <li key={meal.id}>
                            <div>Time: {meal.time}</div>
                            <div>Description: {meal.description}</div>
                            <div>Calories: {meal.calories}</div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default MealList;
