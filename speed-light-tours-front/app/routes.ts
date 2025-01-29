import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // Página principal
  route("/hospedajes", "pages/hospedajes.tsx") // Nueva ruta para hospedajes
] satisfies RouteConfig;
