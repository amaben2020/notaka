import './App.css';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './containers/Login';
import { useEffect, useState } from 'react';
import { AppContext, AppContextType } from './lib/contextLib';
import { Auth } from 'aws-amplify';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Home from './containers/Home';
import Notes from './containers/Note';
import Settings from './containers/Settings';
import UnauthenticatedRoute from '../components/UnAuthenticatedRoute';
import AuthenticatedRoute from '../components/AuthenticatedRoute';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const nav = useNavigate();

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    nav('/login');
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();

      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          {/* <>
            <LinkContainer to="/settings">
              <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </> */}
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <UnauthenticatedRoute>
                  <Login />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnauthenticatedRoute>
                  <Signup />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/notes/new"
              element={
                <AuthenticatedRoute>
                  <NewNote />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/"
              element={
                <AuthenticatedRoute>
                  <Home />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <AuthenticatedRoute>
                  <Notes />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthenticatedRoute>
                  <Settings />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;

// Passw0rd!
