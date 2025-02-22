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
        <Link to="/hotels">Ir a Hospedajes</Link>
      </nav>
      <nav>
        <Link to="/tours">Ir a Tours</Link>
      </nav>
      <nav>
      <Link to="/touReservation">Ir a reservar el tour</Link>
      </nav>
      <nav>
      <Link to="/hotelReservation">Ir a reservar el hotel</Link>
      </nav>
    </div>
  );
}
