import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <header className="home-header">
        <p>Homepage</p>
      </header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="../Login"></Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
    </div>
  );
}

export default Home;
