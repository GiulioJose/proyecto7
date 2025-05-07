const mongoose = require("mongoose");
require("dotenv").config();

const Autor = require("./src/api/models/modelAutor");
const Libro = require("./src/api/models/modelLibros");
const { connectBD } = require("./src/config/db");

const runSeed = async () => {
  try {
    await connectBD();

    // 1. Limpiar base de datos
    await Autor.deleteMany();
    await Libro.deleteMany();

    // 2. Crear autores
    const autores = await Autor.insertMany([
      {
        nombre: "Gabriel",
        apellido: "García Márquez",
        pais: "Colombia"
      },
      {
        nombre: "Isabel",
        apellido: "Allende",
        pais: "Chile"
      }
    ]);

    // 3. Crear libros vinculados a esos autores
    const libros = await Libro.insertMany([
      {
        nombre: "Cien años de soledad",
        ano: 1967,
        idiomas: ["Español", "Inglés"],
        genero: "Fantasía",
        autor: autores[0]._id
      },
      {
        nombre: "El amor en los tiempos del cólera",
        ano: 1985,
        idiomas: ["Español"],
        genero: "Romance",
        autor: autores[0]._id
      },
      {
        nombre: "La casa de los espíritus",
        ano: 1982,
        idiomas: ["Español", "Francés"],
        genero: "Drama",
        autor: autores[1]._id
      }
    ]);

    // 4. Asociar libros a los autores
    for (const libro of libros) {
      await Autor.findByIdAndUpdate(libro.autor, {
        $addToSet: { libros: libro._id }
      });
    }

    console.log("✅ Seed ejecutado correctamente");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error al ejecutar el seed:", error.message);
    mongoose.disconnect();
  }
};

runSeed();
