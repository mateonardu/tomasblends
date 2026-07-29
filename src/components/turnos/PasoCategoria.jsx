export default function PasoCategoria({ categorias, onElegir }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {categorias.map((categoria) => (
        <li key={categoria.id}>
          <button
            type="button"
            onClick={() => onElegir(categoria.id)}
            className="flex h-full w-full flex-col items-start gap-2 rounded-2xl border-2 border-secondary/20 p-5 text-left transition-colors hover:border-primary hover:bg-secondary/5"
          >
            <span className="font-heading text-xl font-semibold text-secondary">
              {categoria.nombre}
            </span>
            <span className="text-sm text-secondary/70">{categoria.descripcion}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
