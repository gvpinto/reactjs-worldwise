import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {

    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert('There was an error loading data');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();

    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (error) {
            alert('There was an error loading data');
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();

            setCities((cities) => [...cities, data]);
            // setCities([...cities, data]);
        } catch (error) {
            console.log(error);
            alert('There was an error loading data');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            await res.json();

            setCities((cities) => cities.filter((city) => city.id !== id));
            // setCities([...cities, data]);
        } catch (error) {
            console.log(error);
            alert('There was an error loading data');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities, isLoading, currentCity, getCity, createCity, deleteCity
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