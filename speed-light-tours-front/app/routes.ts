
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/LandingPage.tsx'),
  route('/tourReservation/:id', 'routes/TourReservationPage.tsx'),
  route('/hotelReservation/:id', 'routes/HotelReservationPage.tsx'),
  route('/reservations', 'routes/ReservationsPage.tsx'),
  route('/profile', 'routes/ProfilePage.tsx'),
  route('/hotels', 'routes/HotelsPage.tsx'),
  route('/tours', 'routes/ToursPage.tsx'),
  route('/cart', 'routes/CartPage.tsx'),
  route('/login', 'routes/LoginPage.tsx'),
  route('/signup', 'routes/SignUpPage.tsx'),

] satisfies RouteConfig;
