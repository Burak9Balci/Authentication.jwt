import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import User from "../Entity/user";
import apiService from "../Services/apiService";

const RegisterForm = () => {
  const api = new apiService();
  const navigate = useNavigate();
  const registerSchema = yup.object().shape({
    name: yup.string().required("İsim zorunludur"),
    email: yup
      .string()
      .email("Geçerli bir email girin")
      .required("Email zorunludur"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .required("Şifre zorunludur"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor")
      .required("Şifre tekrarı zorunludur"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const user = new User(data.email, data.password);
      await api.register(user); // API'ye POST isteği gönder
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/Login");
    } catch (error) {
      console.error("Kayıt başarısız:", error);
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center">Kayıt Ol</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email" className="mt-3">
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

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                isInvalid={errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="success" className="w-100 mt-3">
              Kayıt Ol
            </Button>
          </Form>
          <div className="mt-3 text-center">
            Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default RegisterForm;
