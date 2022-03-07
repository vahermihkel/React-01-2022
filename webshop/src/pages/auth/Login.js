import { useRef } from "react";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  function onLogin(event) {
    event.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  }

  return (
  <form onSubmit={onLogin}>
    <label>E-mail</label>
    <input type="text" ref={emailRef} />
    <label>Parool</label>
    <input type="text" ref={passwordRef} />
  </form>)
}

export default Login;