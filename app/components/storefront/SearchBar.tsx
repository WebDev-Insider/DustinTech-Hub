import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-6">
      <form action="/search" method="GET" className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          name="q"
          placeholder="Search laptops..."
          className="block w-full pl-10 pr-4 py-3.5 bg-secondary border-transparent text-foreground placeholder-muted-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
        />
      </form>
    </section>
  );
}
