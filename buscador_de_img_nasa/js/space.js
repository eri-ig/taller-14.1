const inputBuscar = document.getElementById("inputBuscar");
const boton = document.getElementById("btnBuscar")
const contenedor_imagenes = document.getElementById("contenedor")

document.addEventListener("DOMContentLoaded", () => {
   
    boton.addEventListener("click", ()=>{
accederAImagenes()
 contenedor_imagenes.innerHTML = ""
});

});



function accederAImagenes() {
    const valorABuscar = inputBuscar.value
    const valorABuscarRectificado = valorABuscar.trim().toLowerCase();
    const URL_NASA = `https://images-api.nasa.gov/search?q=${valorABuscarRectificado}`;
    fetch(URL_NASA)
        .then(response => response.json())
        .then(json => {
            const { version, href } = json.collection;
            console.log(version)// a ver si me quedo este
            console.log(href)// a ver si me quedo este x2 y asi seguir con lo demas.

            const items = json.collection.items;
            items.forEach(item => {
                const { hrefs, data, links } = item;
                data.forEach(dato => {
                    console.log(dato)
                    const { center: centro_nasa_relacionado,
                        title: titulo,
                        date_created: fecha_creado,
                        description: descripcion } = dato;
                    const imagen = links[0];
                    const img = imagen.href


                    contenedor_imagenes.innerHTML += ` 
        <div class="col">
        <div class="card">
          <img src="${img}" class="card-img-top" alt="${titulo}" style="width: 100%; height: 250px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5><small class="text-body-secondary"> NASA's center: ${centro_nasa_relacionado}</small>
            <p class="card-text" style="max-height: 100px; overflow-y: auto;">${descripcion}</p>
            <small class="text-body-secondary">${new Date(fecha_creado).toLocaleDateString()}</small>
          </div>
        </div>
      </div> `
                })
            });
        })
        .catch(error => {
            console.error(error)
        });
}