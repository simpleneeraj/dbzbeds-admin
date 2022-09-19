import Button from "components/element/button";
import Input from "components/element/input";
import React from "react";
import css from "styles/auth.module.scss";

type F = React.ChangeEvent<HTMLFormElement>;

const LoginPage = () => {
  const onSubmit = React.useCallback((e: F) => {
    e.preventDefault();
    alert("Not Done Yet");
  }, []);
  return (
    <div className={css.container}>
      <form className={css.login} onSubmit={onSubmit}>
        <div className={css.heading}>
          <h2>Login as Admin</h2>
        </div>
        <Input type="text" placeholder="Enter your email" label={"Email"} />
        <Input
          type="password"
          label={"Password"}
          placeholder="Enter your password"
        />
        <div className={css.controls}>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
