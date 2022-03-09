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
    <label>E-mail</label> <br />
    <input type="text" ref={emailRef} /> <br />
    <label>Parool</label> <br />
    <input type="password" ref={passwordRef} /> <br />
    <button>Logi sisse</button>
  </form>)
}

export default Login;