import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from './pages/Product';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from "./pages/Applayout";
import { useEffect, useState } from "react";
import CityList from "./components/CityList";

const BASE_URL = "http://localhost:8000";

function App() {

    const [cities, setCities] = useState([]);
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


    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<Pricing />} />
                <Route path='/login' element={<Login />} />
                <Route path='app' element={<AppLayout />}>
                    <Route index element={<CityList cities={cities} />} />
                    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                    <Route path='countries' element={<p>List of Countries</p>} />
                    <Route path='form' element={<p>Form</p>} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
