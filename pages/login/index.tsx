import Button from "components/element/button";
import Input from "components/element/input";
import { useLogin } from "network-requests/mutations";
import Router from "next/router";
import React from "react";
import css from "styles/auth.module.scss";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { mutate } = useLogin();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          Router.push("/");
        },
      }
    );
  };

  return (
    <div className={css.container}>
      <form className={css.login} onSubmit={handleSubmit}>
        <div className={css.heading}>
          <h2>Login as Admin</h2>
        </div>
        <Input
          type="text"
          placeholder="Enter your email"
          label={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label={"Password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={css.controls}>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
