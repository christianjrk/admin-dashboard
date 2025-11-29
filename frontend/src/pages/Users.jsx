import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users", form);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.msg || "Failed to create user."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user.");
    }
  };

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
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/users")}
            className="w-full text-left px-3 py-2 rounded-lg bg-slate-800"
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
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400">User management</p>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-xs text-slate-400">
              Signed in as: {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-semibold"
          >
            Sign out
          </button>
        </header>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 text-red-300 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Create user form */}
        <section className="bg-slate-800 rounded-2xl p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create new user</h2>
          <form
            onSubmit={handleCreate}
            className="grid gap-3 md:grid-cols-4 items-end"
          >
            <div>
              <label className="block text-xs mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors py-2 text-sm font-semibold disabled:opacity-60"
              >
                {loading ? "Saving..." : "Create user"}
              </button>
            </div>
          </form>
        </section>

        {/* Users table */}
        <section className="bg-slate-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">User list</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.role}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      className="py-4 text-center text-slate-400"
                      colSpan="4"
                    >
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
