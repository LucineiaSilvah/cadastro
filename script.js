const url = 'http://localhost:3000/usuarios'

const listaUsuarios = document.getElementById('usuarios');
 
const btn = document.querySelector('button');


function get(){

  fetch(url).then(res => res.json()).then(dados => {
    dados.forEach(usuario =>{
   listaUsuarios.innerHTML += `
   <li id="usuario">${usuario.nome}</li>
   
   
   `

    })
  })
}


function post(){
  fetch(url,{
    method: "POST",
    body: JSON.stringify({
      "nome": "l",
      "email": "typicode",
      "senha": "12345"
    }),
    headers: {
      'Content-Type': "application/json"
    }
  }).then(res => res.json()).then(dados => console.log(dados))
}

get()

btn.addEventListener('click', ()=>{
  post()
  get()
} )

