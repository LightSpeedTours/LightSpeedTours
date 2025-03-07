import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const starWarsColors = {
  primary: '#FFE81F', // Star Wars Yellow
  secondary: '#000000', // Space Black
  accent: '#2E67F8', // Lightsaber Blue
  darkGray: '#1A1A1A', // Dark Background
  mediumGray: '#2C2C2C', // Medium Background
  lightGray: '#444444', // Light Background
  textPrimary: '#FFFFFF', // White Text
  textSecondary: '#CCCCCC', // Light Gray Text
  imperial: '#FF0000', // Imperial Red
  hover: {
    primary: '#FFD700', // Darker Yellow
    accent: '#1E4FCC', // Darker Blue
    imperial: '#CC0000', // Darker Red
  },
};

export default function SignupPage() {
  return (
    <div
      className="min-h-screen bg-[${starWarsColors.darkGray}] py-8 px-4"
      style={{
        background: `linear-gradient(to bottom, ${starWarsColors.secondary}, ${starWarsColors.darkGray})`,
      }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Logo Section */}
        <div className="mb-8 p-8 text-center">
          <h1 className="text-4xl font-light" style={{ color: starWarsColors.primary }}>
            Speed Light Tours
          </h1>
          <p className="text-[#CCCCCC] mt-2">The galaxy is waiting for you. Join us!</p>
        </div>

        {/* Form Section */}
        <div
          className="bg-[#2C2C2C] p-8 rounded-lg border border-[#444444] shadow-lg"
          style={{ boxShadow: `0 0 20px rgba(255, 232, 31, 0.1)` }}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#FFFFFF]">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Input"
                  className="w-full rounded-md border border-[#444444] bg-[${starWarsColors.darkGray}] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-[#FFFFFF]">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Input"
                  className="w-full rounded-md border border-[#444444] bg-[${starWarsColors.darkGray}] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#FFFFFF]">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Input"
                  className="w-full rounded-md border border-[#444444] bg-[${starWarsColors.darkGray}] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>

              {/* Birth Date Input */}
              <div className="space-y-2">
                <label htmlFor="birthdate" className="block text-sm font-medium text-[#FFFFFF]">
                  Fecha de nacimiento
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="birthdate"
                    placeholder="Input"
                    className="w-full rounded-md border border-[#444444] bg-[${starWarsColors.darkGray}] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <Calendar className="h-5 w-5 text-[#FFE81F]" />
                  </div>
                </div>
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#FFFFFF]">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Input (8 caracteres, signos y mayuscula)"
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#FFFFFF]"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Input"
                  className="w-full rounded-md border border-[#444444] bg-[#1A1A1A] p-2 text-[#FFFFFF] placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:border-transparent"
                />
                <p className="text-xs text-[#CCCCCC]">Supporting text</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
                <Link to="/">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#FFE81F] py-2 px-4 text-black font-semibold hover:bg-[#FFD700] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:ring-offset-2 focus:ring-offset-[#2C2C2C]"
                  >
                    Crear cuenta
                  </button>
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
