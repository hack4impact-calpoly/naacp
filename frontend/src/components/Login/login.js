import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (data) => {
    console.log(data);
    this.props.history.push("../Home/home");
  };

  const data = {
    name,
    password,
  };

  console.log(data);

  const schema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().min(4).max(15).required(),
  });

  //const { register } = useForm();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="Login">
      <p>Login</p>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Form.Group controlId="username">
          <Form.Control
            {...register("username", { required: true })}
            type="text"
            name="username"
            placeholder="Username"
            className="form"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            {...register("password", { required: true })}
            type="password"
            name="password"
            placeholder="Password"
            className="form"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" id="submit" className="mt-3">
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
