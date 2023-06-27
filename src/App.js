import './App.css';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path:'/',
    element: <Page1/>
  },
  {
    path:'/page2',
    element: <Page2/>
  }
])

function App() {
  return (
    <RouterProvider router={routes}/>
  )
}

export default App;
