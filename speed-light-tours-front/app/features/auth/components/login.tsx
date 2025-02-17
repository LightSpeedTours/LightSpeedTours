import { User, KeyRound } from "lucide-react"
import {starWarsColors} from 'app/shared/utils/colorsTheme'


export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
        <img
            src="../app/shared/assets/Falcon.jpg"
            alt="Login illustration"
            className="w-full aspect-square object-cover"
        />
        </div>
      <div className="flex items-center justify-center bg-[${starWarsColors.mediumGray}] px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Input"
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500">Supporting text</p>
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
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500">Supporting text</p>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
            LOGIN
          </button>
          <div className="text-center">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

