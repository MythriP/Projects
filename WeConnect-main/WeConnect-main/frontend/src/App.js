import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivatePage from "./pages/ActivatePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ResetPasswordConfirmPage from "./pages/ResetPasswordConfirmPage";
import AddPost from "./pages/AddPost";
import Layout from "./hocs/Layout";
import ProfilePage from "./pages/ProfilePage";
import SinglePostPage from "./pages/SinglePostPage";
import ActivationEmailSent from "./pages/ActivationEmailSent";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/edit" component={EditProfilePage} />
          <PrivateRoute exact path="/addpost" component={AddPost} />
          <PrivateRoute exact path="/p/:id" component={SinglePostPage} />
          <PublicRoute
            restricted={true}
            exact
            path="/login"
            component={LoginPage}
          />
          <PublicRoute
            restricted={true}
            exact
            path="/signup"
            component={SignupPage}
          />
          <PublicRoute
            restricted={true}
            exact
            path="/activation-email-sent"
            component={ActivationEmailSent}
          />
          <PublicRoute
            restricted={true}
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />
          <PublicRoute
            restricted={true}
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirmPage}
          />
          <PublicRoute
            // restricted={true}
            exact
            path="/activate/:uid/:token"
            component={ActivatePage}
          />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
