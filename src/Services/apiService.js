import axios from "axios";

class ApiService {
  constructor(url = "https://reqres.in/api") {
    this.url = url;
    this.api = axios.create({
      baseURL: this.url,
      headers: { "Content-Type": "application/json" },
    });

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

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Hatası:", error.response?.data || error.message);
        if (error.response?.status === 401 || error.response?.status === 403) {
          this.logout(); // Yetkisiz erişim varsa çıkış yaptır
        }
        return Promise.reject(error);
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Kullanıcıyı giriş sayfasına yönlendir
  }

  async getAll() {
    try {
      const response = await this.api.get();
      return response.data;
    } catch (error) {
      throw new Error("Ürünleri getirirken hata oluştu: " + error.message);
    }
  }

  async getOne(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü getirirken hata oluştu: ` + error.message
      );
    }
  }

  async makePost(obj) {
    try {
      const response = await this.api.post("", obj);
      return response.data;
    } catch (error) {
      throw new Error("Ekleme sırasında hata oluştu: " + error.message);
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

  async login(userData) {
    try {
      const response = await this.api.post("/login", userData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error("Giriş sırasında hata oluştu: " + error.message);
    }
  }

  async makePut(id, obj) {
    try {
      const response = await this.api.put(`/${id}`, obj);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü güncellerken hata oluştu: ` + error.message
      );
    }
  }

  async makeDelete(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `ID ${id} olan ürünü silerken hata oluştu: ` + error.message
      );
    }
  }
}

export default ApiService;
