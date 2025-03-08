import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, KeyRound, ArrowRight } from 'lucide-react';
import { loginUser } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(''); // Limpiar errores previos
      const token = await loginUser(email, password);
      localStorage.setItem('token', token); // Guardar el token en localStorage
      navigate('/'); // Redirigir al perfil del usuario
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src="../app/shared/assets/Falcon.jpg"
          alt="Login illustration"
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="flex items-center justify-center bg-[#2C2C2C] px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Ingresa tu correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <KeyRound className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md 
            focus:outline-none focus:shadow-outline"
          >
            LOGIN
          </button>
          <div className="text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#444444]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1A1A1A] px-2 text-[#CCCCCC]">Or</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/signUp')}
            className="w-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Create an account
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
