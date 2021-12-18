let fs = require("fs");
class Contenedor {
    constructor(url) {
        this.url = url
    }
    getAll() {
        try {
            let data = fs.readFileSync(this.url, "utf-8");
            let parseData = JSON.parse(data);
            return parseData;
        } catch (error) {
            console.log(error);
        }
    }
    getProduct(id) {
        try {
            let parseData = this.getAll();
            if (parseData[id - 1]) {
                return parseData[id - 1]
            } else {
                return { "error": "Producto no encontrado" }
            }
        } catch (error) {
            console.log(error);
        }
    }
    sendData(newProduct) {
        try {
            let parseData = this.getAll();
            let newId = this.getNewId(parseData);
            let sendProduct = {
                "id": newId,
                ...newProduct
            }
            parseData.push(sendProduct);
            fs.writeFileSync(this.url, JSON.stringify(parseData, null, 2));
            return sendProduct;
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct(id, body) {
        try {
            let getAll = this.getAll();
            let new_product = {
                "id": parseInt(id),
                "title": body.title,
                "price": body.price,
                "url": body.url
            }
            getAll.splice(id - 1, 1, new_product);
            fs.writeFileSync(`${this.url}`, JSON.stringify(getAll, null, 2))
            return new_product;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductId(id) {
        try {
            let getAll = this.getAll();
            let sendData = getAll.filter(data => data.id !== parseInt(id));
            fs.writeFileSync(this.url, JSON.stringify(sendData, null, 2));
        } catch (error) {
            console.log(error);
        }

    }

    getNewId(products) {
        let Idmax = products.reduce((prev, current) => {
            if (current.id > prev.id) {
                return prev.id;
            } else {
                return current.id;
            }
        }, 0);
        return Idmax + 1;
    }
}

module.exports = Contenedor;