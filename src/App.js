import React, { useEffect } from "react";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import Home from "../src/pages/home";
import About from "../src/pages/about";
import Histories from "../src/pages/history";
import QuizList from "../src/pages/quiz";
import QuizDetailList from "../src/pages/quizdetail";
import QuizQuestions from "../src/pages/quizquestions";
import HistoryDetails from "../src/pages/historydetails";
import PartsDetails from "../src/pages/partsdetails";
import CharacterPage from "../src/pages/characterdetails";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/contact";

function App() {
  useEffect(() => {
    document.title = "IHM - Indian History Mythologies";
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/histories" element={<Histories />} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/quiz" element={<QuizList />} />
          <Route path="/quiz/:category" element={<QuizDetailList />} />
          <Route path="/quiz/:category/:quizName" element={<QuizQuestions />} />
          <Route path="/histories/:id" element={<HistoryDetails />} />
          <Route
            path="/histories/:id/parts/:partTitle"
            element={<PartsDetails />}
          />
          <Route
            path="/histories/:id/characters/:characterName"
            element={<CharacterPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
