import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2 text-sm">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/users")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Usuarios
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-800"
          >
            Reportes
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Reportes</h1>
        <p className="text-sm text-slate-300">
          Aquí añadiremos las gráficas y estadísticas más adelante.
        </p>
      </main>
    </div>
  );
}
