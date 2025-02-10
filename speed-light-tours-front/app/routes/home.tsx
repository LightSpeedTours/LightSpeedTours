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
        <Link to="/reservations">Ir a Reservas</Link>
      </nav>
    </div>
  );
}