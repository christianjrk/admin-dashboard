import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersLast7Days: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const getStats = async () => {
    try {
      const res = await api.get("/stats/overview");
      setStats(res.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-2 text-sm">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-800"
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/users")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Users
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Reports
          </button>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs text-slate-400">Welcome back</p>
            <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
            <p className="text-xs text-slate-400">{user?.email}</p>
            <p className="text-xs text-slate-500 mt-1">
              Role: {user?.role || "user"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Sign out
          </button>
        </header>

        {/* Real stats */}
        {loading ? (
          <p className="text-slate-400">Loading statistics...</p>
        ) : (
          <section className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Total users</p>
              <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              <p className="text-xs text-slate-500 mt-1">
                Total registered in the system
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-400">New last 7 days</p>
              <p className="text-3xl font-bold mt-2">
                {stats.newUsersLast7Days}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Users created recently
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Conversion rate</p>
              <p className="text-3xl font-bold mt-2">
                {stats.conversionRate}%
              </p>
              <p className="text-xs text-slate-500 mt-1">
                New / total (last 7 days)
              </p>
            </div>
          </section>
        )}

        {/* Recent activity (dummy) */}
        <section className="bg-slate-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-2">User</th>
                  <th className="py-2">Action</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="py-2">{user?.name || "Christian"}</td>
                  <td className="py-2">Signed in</td>
                  <td className="py-2">Today</td>
                </tr>
                <tr>
                  <td className="py-2">Admin</td>
                  <td className="py-2">Updated reports</td>
                  <td className="py-2">Yesterday</td>
                </tr>
                <tr>
                  <td className="py-2">Guest</td>
                  <td className="py-2">Registered new account</td>
                  <td className="py-2">This week</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
