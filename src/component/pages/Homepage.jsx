import Header from '../Resuable/Header'
import Hero from '../home /Hero'
import CategoryGrid from '../home /CategoryGrid'
import FeaturedListings from '../Resuable/FeatureListtings'
import Footer from '../Resuable/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <FeaturedListings />
      </main>
      <Footer />
    </div>
  )
}

