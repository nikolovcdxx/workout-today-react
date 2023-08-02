import { useEffect, useReducer, createContext } from 'react';

import * as workoutService from '../services/workoutService';

export const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUTS':
            return [...action.payload];
        case 'ADD_WORKOUT':
            return [...state, action.payload];
        case 'FETCH_WORKOUT_DETAILS':
        case 'EDIT_WORKOUT':
            return state.map(x => x._id === action.workoutId ? action.payload : x);
        case 'REMOVE_WORKOUT':
            return state.filter(x => x._id !== action.workoutId);
        case 'LIKE_WORKOUT':
            return state.map(x => x._id === action.workoutId ? { ...x, likedBy: [...x.likedBy, action.userId] } : x);
        default:
            return state;
    }
};

export const WorkoutProvider = ({
    children
}) => {

    const [workouts, dispatch] = useReducer(workoutReducer, []);

    useEffect(() => {
        workoutService.getAll()
            .then(result => {
                if (result === undefined) {
                    return; 
                }

                const action = {
                    type: 'ADD_WORKOUTS',
                    payload: result
                };

                dispatch(action);
            });
    }, []);

    const selectWorkout = (workoutId) => {
        return workouts.find(x => x._id === workoutId) || {};
    };

    const myWorkout = (userId) => {
        return workouts.find(x => x.owner === userId) || {};
    };

    const fetchWorkoutDetails = (workoutId, workoutDetails) => {
        dispatch({
            type: 'FETCH_WORKOUT_DETAILS',
            payload: workoutDetails,
            workoutId,
        });
    };

    const workoutAdd = (workoutData) => {
        dispatch({
            type: 'ADD_WORKOUT',
            payload: workoutData
        });
    };

    const workoutEdit = (workoutId, workoutData) => {
        dispatch({
            type: 'EDIT_WORKOUT',
            payload: workoutData,
            workoutId
        });
    };

    const workoutRemove = (workoutId) => {
        dispatch({
            type: 'REMOVE_WORKOUT',
            workoutId
        });
    };

    const workoutLike = (workoutId, userId) => {
        dispatch({
            type: 'LIKE_WORKOUT',
            workoutId,
            userId
        });
    };

    return (
        <WorkoutContext.Provider value={{ workouts, workoutAdd, selectWorkout, myWorkout, workoutEdit, fetchWorkoutDetails, workoutRemove, workoutLike }}>
            {children}
        </WorkoutContext.Provider>
    );
};