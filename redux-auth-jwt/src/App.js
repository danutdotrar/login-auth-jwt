import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Welcome from "./features/auth/Welcome";
import RequiredAuth from "./features/auth/RequiredAuth";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<RequiredAuth />}>
                    <Route path="welcome" element={<Welcome />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
