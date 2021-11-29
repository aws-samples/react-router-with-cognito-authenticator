import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { PublicPage } from "./pages/PublicPage";
import { ProtectedPage } from "./pages/ProtectedPage";

Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
  },
});

export default function App() {
  return (
    <Router>
      <div>
        <h2>React Router with AWS Amplify Cognito UI</h2>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/protected">
            <ProtectedPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
