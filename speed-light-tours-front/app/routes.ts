import { type RouteConfig, index, route } from "@react-router/dev/routes";

<<<<<<< HEAD
export default [index("routes/ReservationsPage.tsx")] satisfies RouteConfig;
=======
export default [
  index("routes/home.tsx"),
  route("/comentarios","routes/CommentPage.tsx"),
  route("/landingPage","routes/LandingPage.tsx")

] satisfies RouteConfig;
>>>>>>> 233578c2c30fb239687b3d43a6df7620a6f850dc
