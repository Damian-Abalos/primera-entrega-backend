import fs from "fs"
class Productos {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
        this.productos = []
    }
    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.nombreArchivo, 'utf-8', (err, res) => {
                if (err){
                    console.log(err);
                } else {
                    resolve(JSON.parse(res))
                }
            })
        })
    }
    async getById(id) {
        try {
            const data = await this.getAll()
            const search = data.find(res => res.id == id)
            return search || { error: `producto no encontrado` }
        } catch (error) {
            throw new Error(`Error al buscar: ${error}`)
        }
    }
    save(object) {        
        let ultimoId;
        let ultimoProducto = this.productos[this.productos.length - 1];

        if (this.productos.length == 0) {ultimoId = 0} else {ultimoId = ultimoProducto.id}

        const nId = ultimoId + 1        
        const time = Date(Date.now()).toString()
        const nuevoProducto = { ...object, timestamp: time, id: nId}
        this.productos.push(nuevoProducto);
        let jsonProducts = JSON.stringify(this.productos);

        return new Promise((resolve, reject) => {
            fs.writeFile(this.nombreArchivo, jsonProducts, err => {
                if (err){
                    resolve(err)
                } else {
                    resolve(nuevoProducto)
                }
            });            
        })
    }    
    async updateById(object, id) {
        const all = await this.getAll()
        const index = all.findIndex(producto => producto.id == id)
        const data = all[index]
        
        all[index] = {...object, timestamp: data.timestamp, id: data.id}
        return new Promise((resolve, reject) => {
            fs.writeFile(this.nombreArchivo, JSON.stringify(all), err => {
                if(err){
                    resolve(err)
                } else {
                    resolve(all[index])
                }
            })
        })
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            this.productos.splice(id-1, 1);
            let jsonProducts = JSON.stringify(this.productos);
            fs.writeFile(this.nombreArchivo,jsonProducts, err => {
                if (err){
                    console.log(err);
                } else {
                    resolve("producto eliminado")
                }
            })
        })
    }
}
export default Productos