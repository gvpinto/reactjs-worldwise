import { createContext, useContext, useEffect, useReducer, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: ""
};

function reducer(state, { type, payload }) {

    switch (type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            };

        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: payload
            };

        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: payload
            };

        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: payload
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, payload],
                currentCity: payload
            };
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== Number(payload)),
                currentCity: {}
            };

        default:
            throw new Error(`Action Type ${type} not available`);
    }

}

function CitiesProvider({ children }) {

    // const [cities, setCities] = useState([]);
    // const [currentCity, setCurrentCity] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (error) {
                dispatch({ type: 'rejected', payload: 'There was an error loading cities data' });
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {

        if (currentCity.id === Number(id)) return;

        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data });
        } catch (error) {
            dispatch({ type: 'rejected', payload: 'There was an error loading City' });
            alert();
        }
    }

    async function createCity(newCity) {
        dispatch({ type: 'loading' });
        try {

            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data });
            // setCities((cities) => [...cities, data]);
            // setCities([...cities, data]);
        } catch (error) {
            dispatch({ type: 'rejected', payload: 'There was an error creating a City' });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: 'loading' });
        try {

            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            await res.json();
            dispatch({ type: 'city/deleted', payload: id });
            // setCities((cities) => cities.filter((city) => city.id !== id));

        } catch (error) {
            dispatch({ type: 'rejected', payload: 'There was an error deleting a City' });
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities, isLoading, currentCity, error, getCity, createCity, deleteCity
        }} >
            {children}
        </CitiesContext.Provider>
    );
}



function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext is used outsider of Cities Provider");
    return context;
}

export { CitiesProvider, useCities };