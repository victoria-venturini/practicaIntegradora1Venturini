import { Router } from "express"
import cartModel from "../daos/model/cart.model.js"
import { v4 as uuidv4 } from 'uuid';
const userId = uuidv4();
const router = Router()

router.get("/", async (req, res) => {
    try {
        let carts = await cartModel.find()
        res.send({ result: "success", payload: carts })
    } catch (error) {

    }
})

router.get("/:uid", async (req, res) => {
    try {
        const userId = req.params.uid;

        // Buscar el carrito por ID en la base de datos
        const cart = await cartModel.findOne({ userId });

        if (cart) {
            res.send({ result: "success", payload: cart });
        } else {
            res.status(404).send({ result: "error", message: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: "error", message: "Error interno del servidor" });
    }
})


router.post("/", async (req, res) => {
    let { products, id, quantity } = req.body

 
    let result = await cartModel.create({ products, id, quantity })
    res.send({result})
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let cartToReplace = req.body
    if (!cartToReplace.products || !cartToReplace.id || !cartToReplace.quantity) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await cartModel.updateOne({ _id: uid }, cartToReplace)
    res.send({ result: "success", payload: result })
})


router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await cartModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

export default router