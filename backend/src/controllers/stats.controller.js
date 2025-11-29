import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Total de usuarios
    const totalUsers = await User.countDocuments();

    // Nuevos usuarios últimos 7 días
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Tasa de conversión real
    const conversionRate =
      totalUsers > 0 ? Number(((newUsers / totalUsers) * 100).toFixed(1)) : 0;

    res.json({
      totalUsers,
      newUsersLast7Days: newUsers,
      conversionRate,
    });
  } catch (error) {
    console.error("Error getDashboardStats:", error);
    res.status(500).json({ msg: "Error al obtener estadísticas" });
  }
};
