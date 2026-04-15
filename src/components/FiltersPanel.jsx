import { categories } from '../data/products.js'
import { formatINR } from '../utils/currency.js'

export const FiltersPanel = ({
  searchTerm,
  onSearch,
  category,
  onCategory,
  maxPrice,
  onMaxPrice,
}) => {
  return (
    <section className="glass-card mb-8 grid gap-4 rounded-2xl p-4 md:grid-cols-3 md:gap-5 md:p-5">
      <label className="space-y-2">
        <span className="text-sm text-slate-300">Search products</span>
        <input
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Headphones, keyboard..."
          className="input-premium w-full rounded-xl px-4 py-2.5 text-sm"
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm text-slate-300">Category</span>
        <select
          value={category}
          onChange={(event) => onCategory(event.target.value)}
          className="input-premium w-full rounded-xl px-4 py-2.5 text-sm"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Max price</span>
          <span className="font-semibold text-blue-200">{formatINR(maxPrice)}</span>
        </div>
        <input
          type="range"
          min="2000"
          max="70000"
          step="500"
          value={maxPrice}
          onChange={(event) => onMaxPrice(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-blue-500/20 accent-blue-400"
        />
      </label>
    </section>
  )
}
