import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth"

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route 
          path="/auth" 
          element={<AuthPage />}
      />
    </Routes>
  )
}

export default App
