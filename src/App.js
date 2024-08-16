// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn Reacxcv xcvxcvxcvxcvxct
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
//import Navbar from "./components/navbar";
import RecordList from "./components/recordList.js";
import Edit from "./components/edit.js";
import Create from "./components/create.js";
import SingIn from './googleSignIn/signIn.js'
import Signup from './googleSignIn/Signup.js'




const App = () => {


  return (
    <div>
     
      <Routes> 
      {/* <Navbar /> */}
      <Route path="/" element={<SingIn />} />      
        <Route path="/recordList" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
