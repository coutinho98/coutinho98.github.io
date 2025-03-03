import { Route, Routes } from "react-router"
import Readme from './pages/readme'

export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Readme />} />
        </Routes>
    )
}