import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import background from "../assets/background.jpg";

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("🎉 Đăng ký thành công! Mời bạn đăng nhập.");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-start justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white mt-20 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl">👤</span>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">Đăng ký</h1>
          <p className="text-sm text-gray-500">Tạo tài khoản mới của bạn</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
}
