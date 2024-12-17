
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProjectView from './pages/ProjectView'
import Footer from './pages/sub-components/Footer'
// import {ModeToggle} from './components/mode-toggle'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mode from './pages/Mode'


function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          {/* <ModeToggle  /> */}
          <Mode />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/project/:id" element = {<ProjectView />} />
          </Routes>
          <Footer />
          <ToastContainer position='bottom-right' theme='dark' /> 
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
