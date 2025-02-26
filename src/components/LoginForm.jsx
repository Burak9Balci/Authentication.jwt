import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom"; // 🔥 `Navigate` eklendi
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/authSlice";
import apiService from "../Services/apiService";

const LoginForm = () => {
  const api = new apiService();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Kullanıcı giriş yapmışsa, profile yönlendir
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  // Giriş formu doğrulama şeması
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

  const onSubmit = async (data) => {
    try {
      const response = await api.login(data); // API'ye POST isteği gönder

      if (response.token) {
        dispatch(loginSuccess({ email: data.email, token: response.token }));
        alert("Giriş başarılı! Giriş yapabilirsiniz.");
        navigate("/profile"); // 🔥 `navigate` kullanarak yönlendiriyoruz
      }
    } catch (error) {
      alert("Giriş başarısız! Lütfen geçerli bir kullanıcı ile deneyin.");
    }
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
