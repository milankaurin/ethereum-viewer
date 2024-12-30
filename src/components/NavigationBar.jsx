import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Ethereum Viewer</Link>
        <div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Transactions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/balance">Balance</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
