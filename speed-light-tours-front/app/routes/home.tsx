import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { Link } from 'react-router-dom';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  if (typeof document === 'undefined') {
    return null; // Return null if not in a browser environment
  }

  return (
    <div>
      <nav>
        <Link to="/landingPage">Ir a Landing Page</Link>
      </nav>
      <nav>
        <Link to="/reservations">Ir a Reservas</Link>
      </nav>
      <nav>
        <Link to="/profile">Ir a Perfil</Link>
      </nav>
      <nav>
        <Link to="/hotels">Ir a Hospedajes</Link>
      </nav>
      <nav>
        <Link to="/tours">Ir a Tours</Link>
      </nav>
      <nav>
        <Link to="/tourReservation">Ir a reservar el tour</Link>
      </nav>
      <nav>
        <Link to="/hotelReservation">Ir a reservar el hotel</Link>
      </nav>
      <nav>
        <Link to="/cart">Ir al Carrito</Link>
      </nav>
      <nav>
        <Link to="/login">Login Page</Link>
      </nav>
      <nav>
        <Link to="/signup">SignUp Page</Link>
      </nav>
    </div>
  );
}
