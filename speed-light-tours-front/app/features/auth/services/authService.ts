export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la autenticación');
    }

    return data.data.token; // Devolver el token JWT
  } catch (error) {
    throw error;
  }
}


export async function signupUser(
  name: string,
  user_name: string,
  email: string,
  password: string,
  date_of_birth: string
) {
  try {
    const response = await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, user_name, email, password, date_of_birth }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors) {
        throw { errors: data.errors }; // Lanzamos un error con los detalles específicos
      } else {
        throw new Error(data.message || 'Error en el registro');
      }
    }

    return data.data.token; // Retornar el token en caso de éxito
  } catch (error: any) {
    if (error.errors) {
      throw error; // Enviamos los errores específicos al `handleSignup`
    } else {
      throw new Error(error.message || 'Error de conexión con el servidor');
    }
  }
}
