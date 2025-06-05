import ProductSection from '@/components/Dashboard/ProductSection'
import Reviews from '@/components/Activity/Reviews'
import RelatedProducts from '@/components/Clients/RelatedProducts'

export default function Home() {
  return (
    <>
      <ProductSection />
      
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <section aria-labelledby="reviews-heading" className="border-t border-gray-200 pt-10 lg:pt-16">
              <h2 id="reviews-heading" className="sr-only">
                Reviews
              </h2>
              <Reviews />
            </section>
          </div>
        </div>
      </div>
      
      <RelatedProducts />
    </>
  )
}
