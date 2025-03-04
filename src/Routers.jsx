import { Route, Routes } from "react-router"
import Readme from './pages/readme'
import Commits from './pages/commits'

export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Readme />} />
            <Route path='/commits' element={<Commits />} />
        </Routes>
    )
}