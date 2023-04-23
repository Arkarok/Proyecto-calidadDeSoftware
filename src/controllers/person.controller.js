import Person from "../models/Person";

export const renderRegistroForm = async (req, res) => {
  res.render("registros/newRegistro");
};

export const renderIngreso = async (req, res) => {
  res.render("ingresos/newIngreso");
};

export const renderLogger = async (req, res) => {
  res.render("logger");
};

export const renderIndex = async (req, res) => {
  res.render("index");
};

export const createUsuario = async (req, res) => {
  const { id, nombre, tipo_usuario } = req.body;
  try {
    const users = await Person.find({ id: id });
    if (users[0])
      return res.status(400).json({ message: "El usuario ya existe" }); // si el usuario ya existe, no se crea

    const newUsuario = new Person({
      ID: id,
      name: nombre,
      personType: tipo_usuario,
    });

    console.log(newUsuario);

    await newUsuario.save();
    res.render("registros/newRegistro");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ha ocurrido un error" });
  }
};

export const getLogger = async (req, res) => {
  //Preguntar por el descuento ofrecido a los clientes habituales

  const { tipo_usuario } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const descuento = await Descuento.find({});
    if (!descuento[0])
      return res.status(400).json({ message: "No hay descuento" });
    return res
      .status(200)
      .json(
        "El descuento para los clientes habituales es actualmente del: " +
          descuento[0].descuento +
          "%"
      );
  } catch (error) {
    console.log(error);
  }
};

/*export const changeDescuento = async (req, res) => {
  //Cambiar el valor del descuento ofrecido a los clientes habituales
  const { tipo_usuario, nuevoDescuento } = req.body;

  if (tipo_usuario != 2)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const descuento = await Descuento.find({});

    if (!descuento[0]) {
      const newDescuento = new Descuento({
        descuento: nuevoDescuento,
      });

      const descuentoSaved = await newDescuento.save();
      console.log(descuentoSaved);
      return res
        .status(200)
        .json({ message: `Descuento actualizado a ${nuevoDescuento}%` });
    }

    const descuentoFinal = await Descuento.updateOne(
      {},
      { descuento: nuevoDescuento },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: `Descuento actualizado a ${nuevoDescuento}%` });
  } catch (error) {
    console.log(error);
  }
};

export const getDescuento = async (req, res) => {
  //Preguntar por el descuento ofrecido a los clientes habituales

  const { tipo_usuario } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const descuento = await Descuento.find({});
    if (!descuento[0])
      return res.status(400).json({ message: "No hay descuento" });
    return res
      .status(200)
      .json(
        "El descuento para los clientes habituales es actualmente del: " +
          descuento[0].descuento +
          "%"
      );
  } catch (error) {
    console.log(error);
  }
};

export const clientesHabituales = async (req, res) => {
  //Listado de clientes habituales
  const { tipo_usuario } = req.body;

  if (tipo_usuario != 1)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const clientesHabituales = await Usuario.find({ tipo_usuario: 3 });
    return res.status(200).json(clientesHabituales);
  } catch (error) {
    console.log(error);
  }
};

export const gananciasMensuales = async (req, res) => {
  //Calcular las ganancias que tendrán en un mes especificado (considere que todos los meses tienen treinta días).
  const { tipo_usuario, fecha } = req.body;

  if (tipo_usuario != 2)
    return res.status(400).json({ message: "No autorizado" });

  try {
    const reservas = await Reserva.find({});
  } catch (error) {
    console.log(error);
  }
};*/
