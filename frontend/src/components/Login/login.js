import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

function Login() {
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState("");
  const { register } = useForm();

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  // })

  return (
    <div className="Login">
      <p>Login</p>
      <Form.Group controlId="username">
        <Form.Control
          {...register("username", { required: true })}
          type="text"
          name="username"
          placeholder="Username"
          className="form"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          {...register("password", { required: true })}
          type="password"
          name="password"
          placeholder="Password"
          className="form"
        />
      </Form.Group>
    </div>
  );
}

export default Login;
