const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productos",
          required: true
        },
        cantidad: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ],
    estado: {
      type: String,
      enum: ["pendiente", "procesando", "enviado", "cancelado"],
      default: "pendiente"
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "pedidos"
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = Pedido;
