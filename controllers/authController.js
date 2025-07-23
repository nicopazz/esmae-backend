const User = require('../models/User');

const actualizarRolUsuario = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ msg: 'Rol inválido. Debe ser "admin" o "user"' });
  }

  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    usuario.role = role;
    await usuario.save();

    res.json({ msg: `Rol actualizado a ${role}`, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

module.exports = {
  // ...otras funciones
  actualizarRolUsuario,
};
