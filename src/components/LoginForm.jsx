import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiService from "../Services/apiService";
// Login Validation Schema

const LoginForm = () => {
  const api = new apiService();

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Geçerli bir email girin")
      .required("Email zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log("Login Data", data);
  };
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mt-3">
              Giriş Yap
            </Button>
          </Form>
          <div className="mt-3 text-center">
            Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default LoginForm;
