import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router-dom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  if (typeof document === 'undefined') {
    return null; // Return null if not in a browser environment
  }

  return (
    <div>
      <Welcome />      
      <nav>
        <Link to="/comentarios">Ir a Comentarios</Link>        
      </nav>
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
    </div>
  );
}
