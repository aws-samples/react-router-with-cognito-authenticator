import { Authenticator } from "@aws-amplify/ui-react";
import { Switch, Link, useRouteMatch, Route } from "react-router-dom";
import { UserPage } from "./UserPage";
import { AdminPage } from "./AdminPage";
import { SignOutButton } from "../components/SignOutButton";

export const ProtectedPage = () => {
  const { path, url } = useRouteMatch();
  return (
    <Authenticator>
      {({ user }) => {
        const session = user.getSignInUserSession();
        if (!session) throw new Error("SignInSession is empty!");
        const accessToken = session.getAccessToken();
        const groups = accessToken.payload["cognito:groups"] || [];
        const isAdmin = groups.includes("admin");
        return (
          <div>
            <div>
              <SignOutButton />
            </div>
            <h3>Protected Page</h3>
            <div>
              <span>Hi, {user.username}</span>
            </div>
            <div>
              <span>{`Your group is ${
                groups.length > 0 ? groups : "user"
              }`}</span>
              <ul>
                <li>
                  <Link to={`${url}`}>User</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to={`${url}/admin`}>Admin</Link>
                  </li>
                )}
              </ul>
            </div>
            <hr />
            <Switch>
              <Route path={`${path}`} exact>
                <UserPage />
              </Route>
              <Route path={`${path}/admin`}>
                <AdminPage />
              </Route>
            </Switch>
          </div>
        );
      }}
    </Authenticator>
  );
};
