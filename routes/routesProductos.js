let express = require('express');
let router = express.Router();
let Contenedor = require("../controllers/getData");

router.get('/', (req, res) => {
    let contenedor = new Contenedor("./data/productData.txt");
    let getData = contenedor.getAll();
    res.json(getData);
})

router.get('/:id', (req, res) => {
    let contenedor = new Contenedor("./data/productData.txt");
    let getProduct = contenedor.getProduct(req.params.id);
    res.json(getProduct);
})

router.post('/', (req, res) => {
    let newProduct = {
        "title": req.body.title,
        "price": req.body.price,
        "url": req.body.url
    }
    let contenedor = new Contenedor("./data/productData.txt");
    let elementSent = contenedor.sendData(newProduct);
    res.json(elementSent)
})

router.put('/:id', (req, res) => {
    let contenedor = new Contenedor("./data/productData.txt");
    let updateProduct = contenedor.updateProduct(req.params.id, req.body);
    res.json(updateProduct)
})

router.delete('/:id', (req, res) => {
    let contenedor = new Contenedor("./data/productData.txt");
    let deleteProduct = contenedor.deleteProductId(req.params.id);
    res.json(deleteProduct)
})

module.exports = router;