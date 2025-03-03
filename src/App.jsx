import { BrowserRouter } from 'react-router'
import Routers from './Routers'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-stone-950 min-h-screen p-6">
        <div className="max-w-4xl mx-auto mt-10 min-h-screen bg-stone-950">
          <Layout>
            <Routers />
          </Layout>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
