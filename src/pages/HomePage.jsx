import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiltersPanel } from '../components/FiltersPanel.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(70000)

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const inCategory = category === 'All' || product.category === category
      const inPrice = product.price <= maxPrice
      const query = searchTerm.toLowerCase().trim()
      const inSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)

      return inCategory && inPrice && inSearch
    })
  }, [category, maxPrice, searchTerm])

  return (
    <section className="space-y-8">
      <Motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-blue-200/70">Future of Everyday Tech</p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
          Premium gadgets crafted for productivity, play, and performance.
        </h2>
        <p className="max-w-2xl text-slate-300">
          Discover curated hardware with modern industrial design and reliable performance built for creators and gamers.
        </p>
      </Motion.div>

      <FiltersPanel
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        category={category}
        onCategory={setCategory}
        maxPrice={maxPrice}
        onMaxPrice={setMaxPrice}
      />

      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm text-slate-300">
          Showing <span className="font-semibold text-blue-200">{filtered.length}</span> products
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
