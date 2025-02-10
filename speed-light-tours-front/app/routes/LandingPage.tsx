import Header from "../shared/components/Header"
import PromotionsCarousel from "../features/landing/components/promotions-carousel"
import FeaturedDestinations from "../features/landing/components/feature-destinations"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
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
  )
}

