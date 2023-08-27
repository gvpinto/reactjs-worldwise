import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from './pages/Product';
// import AppLayout from "./pages/AppLayout";
// import Login from './pages/Login';
// import PageNotFound from './pages/PageNotFound';
import SpinnerFullPage from "./components/SpinnerFullPage";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Before
// dist / index.html                   0.76 kB │ gzip: 0.42 kB;
// dist / assets / index - 2ade722a.css   30.09 kB │ gzip: 5.01 kB;
// dist / assets / index - ca7637c0.js   524.57 kB │ gzip: 148.65 kB

//After
//     dist / index.html                           0.76 kB │ gzip: 0.42 kB;
// dist / assets / Logo - 515b84ce.css             0.03 kB │ gzip: 0.05 kB;
// dist / assets / Login - f39ef3ff.css            0.35 kB │ gzip: 0.22 kB;
// dist / assets / Product - cf1be470.css          0.47 kB │ gzip: 0.27 kB;
// dist / assets / Homepage - 88d6bfbf.css         0.51 kB │ gzip: 0.30 kB;
// dist / assets / PageNav - d3c5d403.css          0.51 kB │ gzip: 0.28 kB;
// dist / assets / AppLayout - 71578229.css        1.91 kB │ gzip: 0.70 kB;
// dist / assets / index - a0c8dfd5.css           26.42 kB │ gzip: 4.32 kB;
// dist / assets / Product.module-02d70b80.js    0.06 kB │ gzip: 0.07 kB;
// dist / assets / PageNotFound - 9d9b8be3.js      0.15 kB │ gzip: 0.15 kB;
// dist / assets / Logo - 7c1c6f62.js              0.21 kB │ gzip: 0.19 kB;
// dist / assets / PageNav - 775ed122.js           0.49 kB │ gzip: 0.27 kB;
// dist / assets / Pricing - 406e9faa.js           0.65 kB │ gzip: 0.41 kB;
// dist / assets / Homepage - 3ff080b2.js          0.67 kB │ gzip: 0.41 kB;
// dist / assets / Product - c50ae6c7.js           0.86 kB │ gzip: 0.48 kB;
// dist / assets / Login - c7b5e63f.js             1.02 kB │ gzip: 0.53 kB;
// dist / assets / AppLayout -095e88bf.js       156.94 kB │ gzip: 46.15 kB;
// dist / assets / index-007ff861.js           366.03 kB │ gzip: 102.03 kB

function App() {

    return (

        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<Homepage />} />
                            <Route path='product' element={<Product />} />
                            <Route path='pricing' element={<Pricing />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='app' element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<Navigate replace to='cities' />} />
                                <Route path="cities" element={<CityList />} />
                                <Route path="cities/:id" element={<City />} />
                                <Route path='countries' element={<CountryList />} />
                                <Route path='form' element={<Form />} />
                            </Route>
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
