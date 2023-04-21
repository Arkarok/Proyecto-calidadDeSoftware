import Reserva from "../models/reserva";
import Habitacion from "../models/habitacion";
import Cliente from "../models/Usuario";
import Descuento from "../models/Descuento";

export const createReserva = async (req, res) => {
  //Reservar una pieza especificando el número de la pieza, RUT y nombre del cliente.
  const {
    tipo_usuario,
    fecha_entrada,
    numero_dias,
    idf_cliente,
    numero_habitacion,
    nombre,
  } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const habitacion = await Habitacion.findOne({
      numero_habitacion: numero_habitacion,
    });

    if (!habitacion || habitacion.disponibilidad == false)
      return res
        .status(400)
        .json({ message: "La habitacion no esta disponible o no existe" }); // si la habitacion no esta disponible, no se crea la reserva

    const cliente = await Cliente.findOne({ identificacion: idf_cliente });

    const dcto = await Descuento.find({});
    console.log(cliente);
    if (!cliente)
      return res.status(400).json({ message: "El cliente no existe" }); // si el cliente no existe, no se crea la reserva

    // se calcula el precio total de la reserva
    const precioSinDescuento = habitacion.precio * numero_dias;
    let descuento = 0;
    let precioTotal = precioSinDescuento - descuento;
    if (cliente.tipo_usuario == 3)
      descuento = precioSinDescuento * (dcto[0].descuento / 100); // si el cliente es de tipo 3, se aplica el descuento

    precioTotal = precioSinDescuento - descuento;

    const newReserva = new Reserva({
      fecha_entrada,
      numero_dias,
      idf_cliente,
      numero_habitacion,
      nombre,
      precio_total: precioTotal,
    });

    const reservaSaved = await newReserva.save();

    await Habitacion.findOneAndUpdate(
      // se actualiza la disponibilidad de la habitacion
      { numero_habitacion: numero_habitacion },
      { disponibilidad: false },
      {
        new: true,
      }
    );

    res.status(201).json(reservaSaved);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReserva = async (req, res) => {
  //Eliminar una reserva especificando el número de la pieza

  const { numero_habitacion } = req.params;
  try {
    const reserva = await Reserva.findOneAndDelete({
      numero_habitacion: numero_habitacion,
    });
    await Habitacion.findOneAndUpdate(
      // se actualiza la disponibilidad de la habitacion
      { numero_habitacion: reserva.numero_habitacion },
      { disponibilidad: true },
      {
        new: true,
      }
    );
    res.status(200).json(`Habitacion #${numero_habitacion}: Reserva eliminada`);
  } catch (error) {
    console.log(error);
  }
};

export const getPrecioTotalPorCliente = async (req, res) => {
  const { tipo_usuario, idf_cliente, numero_dias, tipo_pieza } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const reserva = await Reserva.findOne({
      idf_cliente: idf_cliente,
      numero_dias: numero_dias,
    });
    if (!reserva) return res.status(400).json({ message: "Datos inválidos" });

    const habitacion = await Habitacion.findOne({
      numero_habitacion: reserva.numero_habitacion,
    });
    if (!habitacion)
      return res.status(400).json({ message: "Datos inválidos" });

    return res.status(200).json(`El precio total es: ${reserva.precio_total}`);
  } catch (error) {
    console.log(error);
  }
};

export const getReservasPorCliente = async (req, res) => {
  //Mostrar la cantidad de reservas realizadas por el usuario ‘Ana Perez’

  const { tipo_usuario, name } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const cliente = await Cliente.findOne({ nombre: name });
    const reservasCliente = await Reserva.find({
      idf_cliente: cliente.identificacion,
    });
    res.status(200).json(reservasCliente);
  } catch (error) {
    console.log(error);
  }
};
