import React, {useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const pageSize = 6;
  const apiKey= process.env.REACT_APP_NEW_API;

  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
          <LoadingBar
            height={5}
            color='#f11946'
            progress={progress}
          />
          <Navbar />
          <Routes>
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} category="business" country="in" />}></Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} category="entertainment" country="in" />}></Route>
            <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} category="general" country="in" />}></Route>
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} category="health" country="in" />}></Route>
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} category="science" country="in" />}></Route>
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} category="sports" country="in" />}></Route>
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} category="technology" country="in" />}></Route>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} category="general" country="in" />}></Route>
          </Routes>
        </Router>
      </div>
    )
}
