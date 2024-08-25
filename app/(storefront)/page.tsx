import { CategoriesSelection } from '../components/storefront/CategorySelection';
import { FeaturedProducts } from '../components/storefront/FeaturedProducts';
import { Hero } from '../components/storefront/Hero';
import { Navbar } from '../components/storefront/Navbar';
import { ProductCard } from '../components/storefront/ProductCard';

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
