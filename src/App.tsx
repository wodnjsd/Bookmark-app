import Home from "./components/Home"
import { BookmarkProvider } from "./context/BookmarkContext"



function App() {

  return (
    <BookmarkProvider>
       <div className="app">
     <Home />
    </div>

    </BookmarkProvider>
   
  )
}

export default App
