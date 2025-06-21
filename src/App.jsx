import { BrowserRouter } from 'react-router'
import Routers from './Routers'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-stone-950 min-h-screen p-6">
        <Layout>
          <Routers />
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
