import AddTask from "./components/AddTask"
import List from "./components/List"
import NavBar from "./components/NavBar"
import {BrowserRouter,Route,Routes } from "react-router-dom"
import UpdateTask from "./components/UpdateTask"
import SignUp from "./components/SignUp"
import Login from "./components/Login"


function App() {
  return (
      <>
     
       <NavBar></NavBar>
       <Routes>
          <Route path="/list" element={<List></List>}></Route>
          <Route path="/add" element={<AddTask></AddTask>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/update/:id" element={<UpdateTask></UpdateTask>}></Route>
       </Routes>
      
      </>
       
      
  )
}

export default App
