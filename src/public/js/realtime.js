const socket = io(); 
const role = document.getElementById("role").textContent;
const email = document.getElementById("email").textContent;

socket.on("products", (data) => {
    //console.log(data);
    renderProducts(data);
})

//Función para renderizar nuestros productos: 

const renderProducts = (products) => {
    const containerProducts = document.getElementById("containerProducts");
    containerProducts.innerHTML = "";
    
    products.docs.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = ` 
                     <img src=${item.image}>
                        <p> ${item.title} </p>
                        <p> ${item.price} </p>
                        <button> Eliminar </button>
                        `;

        containerProducts.appendChild(card);
        //Agregamos el evento al boton de eliminar: 
        card.querySelector("button").addEventListener("click", ()=> {
            if (role === "premium" && item.owner === email) {
            deleteProduct(item._id);
        } else if (role === "admin") {
            deleteProduct(item._id);
        } else {
            Swal.fire({
                title: "Error",
                text: "No tenes permiso para borrar ese producto",
            })
        }
        })
    })
}

const deleteProduct = (id) =>  {
    socket.emit("deleteProduct", id);
}

//Agregamos productos del formulario: 

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
})


const addProduct = () => {
    const role = document.getElementById("role").textContent;
    const email = document.getElementById("email").textContent;

    const owner = role === "premium" ? email : "admin";

    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
        owner
    };

    socket.emit("addProduct", product);
}
