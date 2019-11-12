
let d = document;
let livros = d.getElementById("livros")
let usuarios = d.getElementById('usuarios')

usuarios.addEventListener('click' , (event) => {
  let target = event.target;
  let id = target.dataset.ref;
  
  if(target.dataset.type == 'delete'){
    fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' })
      .then(res => { 
        let tr = d.getElementById(`usuarios_${id}`)
        tr.remove();
        console.log(res); 
      })
      .catch( err => console.log(err))
  }
})

livros.addEventListener('click' , (event) => {
  let target = event.target;
  let id = target.dataset.ref;
  
  if(target.dataset.type == 'delete'){
    fetch(`http://localhost:3000/livros/${id}`, { method: 'DELETE' })
      .then(res => { 
        let tr = d.getElementById(`livros_${id}`)
        tr.remove();
        console.log(res); 
      })
      .catch( err => console.log(err))
  }
})