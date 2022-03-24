import { useRef } from "react";

function SendEmail() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  function send() {
      window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : "mihkelvaher@hotmail.com",
        Password : "ABF2152D22F3ACF15133A77E4424C43C31C6",
        To : 'vahermihkel@gmail.com',
        From : "vahermihkel@gmail.com",
        Subject : "This is the subject",
        Body : `Email tuli inimeselt: ${nameRef.current.value} . 
              Tema email: ${nameRef.current.value} ja tema sõnum:
              ${messageRef.current.value}
              `
    }).then(
      message => alert(message)
    );
  }

  return (
    <div>
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Email</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Sõnum</label> <br />
      <input ref={messageRef} type="text" /> <br />
      <button onClick={send}>SendEmail</button> <br />
    </div>
  )
}

export default SendEmail;