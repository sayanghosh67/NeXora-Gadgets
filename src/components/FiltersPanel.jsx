import { Search, SlidersHorizontal } from 'lucide-react'
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
    <section className="glass-card space-y-5 rounded-2xl p-5">
      {/* Row 1: search + price */}
      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        {/* Search input */}
        <label className="space-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            <Search className="size-3.5" />
            Search
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Headphones, keyboard, monitor…"
              className="input-premium w-full rounded-xl py-2.5 pl-10 pr-4 text-sm"
            />
          </div>
        </label>

        {/* Price range */}
        <label className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
              <SlidersHorizontal className="size-3.5" />
              Max price
            </span>
            <span className="rounded-lg border border-blue-400/25 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-300">
              {formatINR(maxPrice)}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs text-slate-500">{formatINR(2000)}</span>
            <input
              id="price-range"
              type="range"
              min="2000"
              max="70000"
              step="500"
              value={maxPrice}
              onChange={(e) => onMaxPrice(Number(e.target.value))}
              className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-blue-900/50 accent-blue-400"
              style={{
                background: `linear-gradient(to right, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0.7) ${((maxPrice - 2000) / (70000 - 2000)) * 100}%, rgba(15,23,42,0.6) ${((maxPrice - 2000) / (70000 - 2000)) * 100}%, rgba(15,23,42,0.6) 100%)`
              }}
            />
            <span className="text-xs text-slate-500">{formatINR(70000)}</span>
          </div>
        </label>
      </div>

      {/* Row 2: category chips */}
      <div>
        <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              id={`category-${item.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => onCategory(item)}
              className={`rounded-xl border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                category === item
                  ? 'border-blue-400/60 bg-blue-500/20 text-blue-200 shadow-[0_0_18px_rgba(59,130,246,0.22)]'
                  : 'border-white/8 text-slate-400 hover:border-blue-400/32 hover:bg-blue-500/8 hover:text-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
