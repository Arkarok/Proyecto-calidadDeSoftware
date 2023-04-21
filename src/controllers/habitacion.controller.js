import Habitacion from "../models/habitacion";

export const createHabitacion = async (req, res) => {
  const { tipo_usuario, numero_habitacion, tipo_pieza, precio } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  const habitacion = await Habitacion.findOne({
    numero_habitacion: numero_habitacion,
  });

  if (habitacion)
    return res.status(400).json({ message: "La habitacion ya existe" });

  try {
    const newHabitacion = new Habitacion({
      disponibilidad: true,
      numero_habitacion,
      tipo_pieza,
      precio,
    });

    const habitacionSaved = await newHabitacion.save();

    res.status(201).json(habitacionSaved);
  } catch (error) {
    console.log(error);
  }
};

export const getHabitaciones = async (req, res) => {
  //Obtener un listado de las piezas disponible de acuerdo con su tipo
  const { tipo_usuario, tipo_pieza } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const habitaciones = await Habitacion.find({
      tipo_pieza: tipo_pieza,
      disponibilidad: true,
    });

    res.status(200).json(habitaciones);
  } catch (error) {
    console.log(error);
  }
};

export const getPrecioHabitacionPorTipo = async (req, res) => {
  //Preguntar por el precio de una pieza de acuerdo con su tipo
  const { tipo_usuario, tipo_pieza } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const habitaciones = await Habitacion.find({
      tipo_pieza: tipo_pieza,
    });
    if (!habitaciones[0])
      return res
        .status(400)
        .json({ message: "Aún no hay habitaciones por ese tipo" });
    res
      .status(200)
      .json(`El precio de la habitación es: ${habitaciones[0].precio}`);
  } catch (error) {
    console.log(error);
  }
};

export const cambiarPrecioHabitacionPorTipo = async (req, res) => {
  //Cambiar el precio de una pieza de acuerdo a su tipo
  const { tipo_usuario, tipo_pieza, precioNuevo } = req.body;

  if (tipo_usuario != 2)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const habitaciones = await Habitacion.updateMany(
      { tipo_pieza: tipo_pieza },
      { precio: precioNuevo },
      { new: true }
    );

    res.status(200).json({ message: "Precio actualizado a " + precioNuevo });
  } catch (error) {
    console.log(error);
  }
};
