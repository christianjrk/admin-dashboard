import User from "../models/User.js";
import bcrypt from "bcrypt";

// GET /api/users  (lista todos los usuarios sin contraseña)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error getUsers:", error);
    res.status(500).json({ msg: "Error al obtener usuarios" });
  }
};

// POST /api/users  (crear usuario nuevo)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    await newUser.save();

    res.json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error createUser:", error);
    res.status(500).json({ msg: "Error al crear usuario" });
  }
};

// PUT /api/users/:id  (actualizar usuario)
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ msg: "Usuario actualizado", user: updated });
  } catch (error) {
    console.error("Error updateUser:", error);
    res.status(500).json({ msg: "Error al actualizar usuario" });
  }
};

// DELETE /api/users/:id  (eliminar usuario)
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};
