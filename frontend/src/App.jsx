import AddTask from "./components/AddTask"
import List from "./components/List"
import NavBar from "./components/NavBar"
import { Route,Routes } from "react-router"
function App() {
  return (
      <>
       <NavBar></NavBar>
       <Routes>
          <Route path="/list" element={<List></List>}></Route>
          <Route path="/add" element={<AddTask></AddTask>}></Route>
       </Routes>
      </>
       
      
  )
}

export default App
