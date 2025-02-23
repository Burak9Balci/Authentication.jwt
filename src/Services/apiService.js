import axios from "axios";

class ApiService {
  constructor(url) {
    this.url = url;
    this.api = axios.create({
      baseURL: this.url,
      headers: { "Content-Type": "application/json" },
    });

    // Request Interceptor (Tüm isteklere otomatik token ekler)
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor (Hataları merkezi yönetir)
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login"; // Kullanıcıyı çıkış yaptır
        }
        return Promise.reject(error);
      }
    );
  }

  async getAll() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      throw new Error("Ürünleri getirirken hata oldu: " + error.message);
    }
  }

  async login(userData) {
    try {
      const response = await this.api.post("/login", userData);
      localStorage.setItem("token", response.token); // Token kaydediliyor
      return response.data;
    } catch (error) {
      throw new Error("Giriş sırasında hata oluştu: " + error.message);
    }
  }

  async getOne(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü getirirken hata oldu: ` + error.message
      );
    }
  }

  async makePost(obj) {
    try {
      const response = await this.api.post("/", obj);
      return response.data;
    } catch (error) {
      throw new Error("Ekleme sırasında hata oldu: " + error.message);
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw new Error("Kayıt sırasında hata oluştu: " + error.message);
    }
  }

  async makePut(id, obj) {
    try {
      const response = await this.api.put(`/${id}`, obj);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü güncellerken hata oldu: ` + error.message
      );
    }
  }

  async makeDelete(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü silerken hata oldu: ` + error.message
      );
    }
  }
}

export default ApiService;
