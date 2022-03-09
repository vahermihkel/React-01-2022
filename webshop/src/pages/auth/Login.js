import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInService } from "../../services/loggedInService";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function onLogin(event) {
    event.preventDefault();
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkmh0cv6MeXbmswO9mXcFPaiVH3hfJQZI";
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
  }
    fetch(url,{
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
      if (res.ok) {
        navigate("/admin/");
        sessionStorage.setItem("loggedIn", true);
        loggedInService.sendIsLoggedIn(true);
      } else {
        return res.json();
      }
    }).then(data => {
      if (data) {
        setErrorMessage(data.error.message);
      }
    });
  }

  return (
  <div>
    <div>{errorMessage}</div>
    <form onSubmit={onLogin}>
      <label>E-mail</label> <br />
      <input type="text" ref={emailRef} /> <br />
      <label>Parool</label> <br />
      <input type="password" ref={passwordRef} /> <br />
      <button>Logi sisse</button>
    </form>
  </div>)
}

export default Login;