import fs from "fs";
import { resolve } from "path";

class Carritos {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    getAllCarts() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.nombreArchivo, "utf-8", (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(JSON.parse(res));
                }
            });
        });
    }

    async create() {
        const carts = await this.getAllCarts();
        const nId = carts.length == 0 ? 1 : carts[carts.length - 1].id + 1;
        const time = Date(Date.now()).toString();
        const newCart = { id: nId, timestamp: time, productos: [] };
        carts.push(newCart);
        const jsonProducts = JSON.stringify(carts);

        return new Promise((resolve, reject) => {
            fs.writeFile(this.nombreArchivo, jsonProducts, (err) => {
                if (err) {
                    resolve(`Error al guardar: ${err}`);
                } else {
                    resolve(`carrito con id: ${newCart.id} creado`);
                }
            });
        });
    }

    async deleteCartByID(id) {
        const carts = await this.getAllCarts();
        const search = carts.find((res) => res.id == id);

        return new Promise((resolve, reject) => {
            carts.splice(search, 1);
            let jsonProducts = JSON.stringify(carts);
            fs.writeFile(this.nombreArchivo, jsonProducts, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve(`carrito con id ${id} eliminado`);
                }
            });
        });
    }

    async saveById(object, id) {
        const carts = await this.getAllCarts();
        const index = carts.findIndex((res) => res.id == id);
        const saveIn = carts[index];
        const array = saveIn.productos;        
        if (index == -1) {
            return { Error: `no se encontró el id ${id}` };
        } else {
            array.push(object);
            let jsonProducts = JSON.stringify(carts);
            return new Promise((resolve, reject) =>{
                fs.writeFile(this.nombreArchivo, jsonProducts, (err) =>{
                    if (err) {
                        resolve(`Error al guardar: ${err}`);
                    } else {
                        resolve(saveIn);
                    }
                });
            })
        }
    }

    async getProductsById(id) {
        const carts = await this.getAllCarts()
        const search = carts.find(resp => resp.id == id)
        const products = search.productos

        try {
            return products || { error: `productos no encontrados` }
        } catch (error) {
            return (`Error al buscar: ${error}`)
        }
    }

    async getById(id) {
        try {
            const data = await this.getAllCarts()
            const search = data.find(res => res.id == id)
            return search || { error: `producto no encontrado` }
        } catch (error) {
            throw new Error(`Error al buscar: ${error}`)
        }
    }
    // async updateById(object, id) {
    //     const all = await this.getAllCarts()
    //     const index = all.findIndex(producto => producto.id == id)
    //     const data = all[index]
        
    //     all[index] = {...object, timestamp: data.timestamp, id: data.id}
    //     return new Promise((resolve, reject) => {
    //         fs.writeFile(`${this.nombreArchivo}/${id}`, JSON.stringify(all), err => {
    //             if(err){
    //                 resolve(err)
    //             } else {
    //                 resolve(all[index])
    //             }
    //         })
    //     })
    // }

    async updateById(id, id_prod) {
        const carts = await this.getAllCarts()
        const cartIndex = carts.findIndex(res => res.id == id)
        const prods = carts[cartIndex].productos
        const indexToDelete = prods.findIndex(res => res.id == id_prod)

        if (indexToDelete == -1) {
            return { error: `producto no encontrado` }
        } else {
            prods.splice(indexToDelete, 1)
            fs.writeFile(this.nombreArchivo, JSON.stringify(carts, null, 2), err =>{
                if (err){
                    resolve(err)
                } else {
                    resolve(`producto con id:${id_prod} borrado`)
                }
            })
        }    
    }
}

export default Carritos;
