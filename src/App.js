import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import { Container } from "semantic-ui-react";

export default function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/post/:postId" component={SinglePost} />
        </Router>
      </Container>
    </AuthProvider>
  );
}
