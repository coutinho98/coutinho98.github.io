import { Route, Routes } from "react-router"
import Readme from './pages/readme'
import Commits from './pages/commits'
import Showcase from './pages/showcase'

export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Readme />} />
            <Route path='/commits' element={<Commits />} />
            <Route path="/showcase" element={<Showcase />} />
        </Routes>
    )
}