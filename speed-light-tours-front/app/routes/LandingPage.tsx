import Header from '../shared/components/Header';
import PromotionsCarousel from '../features/landing/components/promotions-carousel';
import FeaturedDestinations from '../features/landing/components/feature-destinations';
import type { Route } from '../+types/root';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Light Speed Tours' },
  ];
}

export default function LandingPage() {
    if (typeof document === 'undefined') {
      return null; // Return null if not in a browser environment
    }
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Promociones</h2>
          <PromotionsCarousel />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Destinos Destacados</h2>
          <FeaturedDestinations />
        </section>
      </div>
    </main>
  );
}
