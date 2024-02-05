import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import DisplayBooks from "./DisplayBook"
import HomePage from "../pages/HomePage"
import NavBar from "./NavBar"
import Register from "./Register"
import PrivateRoutes from "./PrivateRoutes"

function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <HomePage />
                } />
                <Route path="/books" element={
                    <PrivateRoutes>
                        <DisplayBooks />
                    </PrivateRoutes>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}
export default Router