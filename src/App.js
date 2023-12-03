import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import Missing from './Missing'
import About from './About';
import PostPage from './PostPage';
import Footer from './Footer';
import EditPost from './EditPost'

import { DataProvider } from './context/DataContext';




function App() {

  

  return (
    <div className="App">
      <DataProvider>
      <Header title="Mini Social Media App" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post">
          <Route index element={
            <NewPost />
          }/>
          <Route 
            path=":id" 
            element={
              <PostPage />
            }
          />
          <Route 
            path="edit/:id" 
            element={<EditPost />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />}/>
      </Routes> 
      <Footer />    
      </DataProvider>
    </div>
  );
}

export default App;
