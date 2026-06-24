import AddTask from "./components/AddTask"
import List from "./components/List"
import NavBar from "./components/NavBar"
import {BrowserRouter,Route,Routes } from "react-router-dom"
import UpdateTask from "./components/UpdateTask"


function App() {
  return (
      <>
     
       <NavBar></NavBar>
       <Routes>
          <Route path="/list" element={<List></List>}></Route>
          <Route path="/add" element={<AddTask></AddTask>}></Route>
          <Route path="/update/:id" element={<UpdateTask></UpdateTask>}></Route>
       </Routes>
      
      </>
       
      
  )
}

export default App
