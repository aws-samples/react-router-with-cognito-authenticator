import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export const SignOutButton = () => {
  const { push } = useHistory();
  const onButtonClick = async () => {
    await Auth.signOut();
    alert("Signed out");
    push("/public");
  };
  return <button onClick={onButtonClick}>Sign Out</button>;
};
