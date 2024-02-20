import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';

interface Meal {
    time: string;
    description: string;
    calories: number;
}

const MealEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<Meal>({
        time: 'Breakfast',
        description: '',
        calories: 0,
    });

    useEffect(() => {
        if (id && id !== 'new') {
            axiosApi.get<Meal>(`/meal/${id}.json`)
                .then(response => {
                    if (response.data) {
                        setMeal(response.data);
                    }
                })
                .catch(error => console.error('Error fetching meal:', error));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMeal(prevMeal => ({
            ...prevMeal,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!id || id === 'new') {
                await axiosApi.post('/meal.json', meal);
            } else {
                await axiosApi.put(`/meal/${id}.json`, meal);
            }
            window.location.href = '/'; // Перенаправление на главную страницу после сохранения
        } catch (error) {
            console.error('Error saving meal:', error);
        }
    };

    return (
        <div>
            <h2>{id === 'new' ? 'Add Meal' : 'Edit Meal'}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Time:
                    <select name="time" value={meal.time || ''} onChange={handleChange}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Snack">Snack</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={meal.description || ''} onChange={handleChange} />
                </label>
                <label>
                    Calories:
                    <input type="number" name="calories" value={meal.calories || 0} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default MealEdit;
