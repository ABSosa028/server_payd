const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "123",
  database: "historicos",
});

connection.query(
  `
  CREATE TABLE IF NOT EXISTS registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_solicitud CHAR(255),
    estado BOOLEAN
  )
`,
  (error, results) => {
    if (error) {
      console.error("Error al crear la tabla:", error);
    } else {
      console.log("Tabla creada correctamente o ya existente");
    }
  }
);

function actualizarRegistros() {
  connection.query(
    "UPDATE registros SET estado = NOT estado",
    (error, results) => {
      if (error) {
        console.error("Error al actualizar registros:", error);
      } else {
        console.log("Registros actualizados correctamente");
      }
    }
  );
}

connection.connect(error => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }
  console.log("Conexión a la base de datos establecida");
  setInterval(actualizarRegistros, 3 * 60 * 1000);
});
