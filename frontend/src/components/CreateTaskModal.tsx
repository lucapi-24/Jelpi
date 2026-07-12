const priorities = ["low", "medium", "high"] as const;
const energies = ["low", "medium", "high"] as const;

export default function CreateTaskModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-800">Nueva tarea</h2>
          <svg
            className="size-5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-500">
              Título
            </label>
            <div className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-300">
              ¿Qué necesitas hacer?
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Prioridad
              </label>
              <div className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
                Media
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Energía
              </label>
              <div className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
                Media
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Duración
              </label>
              <div className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700">
                30
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <div className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-500">
              Cancelar
            </div>
            <div className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white">
              Crear tarea
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
