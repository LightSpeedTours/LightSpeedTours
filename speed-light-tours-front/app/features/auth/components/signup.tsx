import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { signupUser } from '../services/authService';
import { Eye, EyeOff } from 'lucide-react';



export default function SignupPage() {
  const [name, setName] = useState('');
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setFieldErrors({ password: 'Las contraseñas no coinciden.' });
      return;
    }
  
    try {
      setError(null);
      setFieldErrors({});
  
      const token = await signupUser(name, user_name, email, password, date_of_birth);
  
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (error: any) {
      if (error.errors) {
        setFieldErrors(error.errors); // Guardar los errores específicos
      } else {
        setError(error.message); // Error general
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-[#1A1A1A] py-8 px-4" style={{ background: `linear-gradient(to bottom, #000000, #1A1A1A)` }}>
      <div className="mx-auto max-w-3xl">
        {/* Logo Section */}
        <div className="mb-8 p-8 text-center">
          <h1 className="text-4xl font-light" style={{ color: '#FFE81F' }}>
            Speed Light Tours
          </h1>
          <p className="text-[#CCCCCC] mt-2">The galaxy is waiting for you. Join us!</p>
        </div>

        {/* Form Section */}
        <div className="bg-[#2C2C2C] p-8 rounded-lg border border-[#444444] shadow-lg" style={{ boxShadow: `0 0 20px rgba(255, 232, 31, 0.1)` }}>
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#FFFFFF]">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder='Anakyn Skywalker'
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-[#FFFFFF]">Nombre de usuario</label>
                <input
                  type="text"
                  id="username"
                  value={user_name}
                  placeholder='WookieLover'
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                {fieldErrors.user_name && <p className="text-red-500 text-xs">{fieldErrors.user_name}</p>}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF]">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder='name@email.com'
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
              </div>

              {/* Birth Date Input */}
              <div className="space-y-2">
                <label htmlFor="birthdate" className="block text-sm font-medium text-[#FFFFFF]">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="birthdate"
                  value={date_of_birth}
                  placeholder='DD-MM-AAAA'
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] 
                  focus:border-transparent"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#FFFFFF]">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} // Cambia el tipo dinámicamente
                    id="password"
                    value={password}
                    placeholder="8 caracteres, signos y mayúscula"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] 
      focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent pr-10"
                  />
                   {fieldErrors.password && <p className="text-red-500 text-xs">{fieldErrors.password}</p>}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-[#FFE81F]"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} // Mejora de accesibilidad
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#FFFFFF]">Confirmar contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-md bg-[#FFE81F] py-2 px-4 text-black font-semibold hover:bg-[#FFD700] 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:ring-offset-2 
                focus:ring-offset-[#2C2C2C]"
              >
                Crear cuenta
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}