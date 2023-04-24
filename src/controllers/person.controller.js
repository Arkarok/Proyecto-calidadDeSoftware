import Logger from "../models/Logger";
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
    const user = await Person.findOne({ id });
    if (user)
      return res.status(400).json({ message: "El usuario ya existe" });

    const newUsuario = new Person({
      ID: id,
      name: nombre,
      personType: tipo_usuario,
    });

    const userSaved = await newUsuario.save();
    
    return userSaved;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "ha ocurrido un error" });
  }
};

export const getLogger = async (req, res) => {
  const { personID } = req.body;

  let logs;
  if (personID)
    logs = await Logger.findOne({ personID });
  else
    logs = await Logger.find();

  return logs;
};

export const saveLog = async (req, res) => {
  const { personID, entered } = req.body;

  console.log(entered);
  
  const now = new Date();

  const newLog = new Logger({
    personID,
    entered: entered != null ? true : false,
    when: now
  });
  
  const logSaved = await newLog.save();

  console.log(logSaved);

  return logSaved;
};
