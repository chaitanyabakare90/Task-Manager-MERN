import AddTask from "./components/AddTask"
import List from "./components/List"
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UpdateTask from "./components/UpdateTask"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import WelcomePage from "./components/WelcomePage"


function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<WelcomePage></WelcomePage>}></Route>
        <Route path="/list"
          element={<ProtectedRoute>
            <List />
          </ProtectedRoute>}></Route>
        <Route path="/add"
          element={<ProtectedRoute>
            <AddTask/>
          </ProtectedRoute>}></Route>
        <Route path="/update/:id" 
          element={<ProtectedRoute>
          <UpdateTask/>
        </ProtectedRoute>}>
        </Route>    
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        
      </Routes>

    </>


  )
}

export default App
