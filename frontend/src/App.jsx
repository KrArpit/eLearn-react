import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth"
import RouteGuard from "./components/routeGuard"
import { useContext } from "react"
import { AuthContext } from "./context/authContext";
import InstrctorDashboardPage from "./pages/instructor";
import StudentViewCommonLayout from "./components/studentView/commonLayout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/notFound";

function App() {
  const {auth} = useContext(AuthContext);

  return (
    <Routes>
      <Route 
          path="/auth" 
          element={
            <RouteGuard 
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}/>
          }
      />
      <Route 
          path="/instructor" 
          element={
            <RouteGuard 
            element={<InstrctorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}/>
          }
      />
      <Route 
          path="/" 
          element={
            <RouteGuard 
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}/>
          }
      >
        <Route path="" element={<StudentHomePage/>}/>
        <Route path="home" element={<StudentHomePage/>}/>
      </Route>
      <Route
        path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App
