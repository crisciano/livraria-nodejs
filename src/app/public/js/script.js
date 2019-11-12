
let d = document;
let books = d.getElementById("books")
let users = d.getElementById('users')

users ? 
  users.addEventListener('click' , (event) => {
    let target = event.target;
    let id = target.dataset.ref;
    
    if(target.dataset.type == 'delete'){
      fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
        .then(res => { 
          let tr = d.getElementById(`users_${id}`)
          tr.remove();
          console.log(res); 
        })
        .catch( err => console.log(err))
    }
  }) 
: null


books ? 
  books.addEventListener('click' , (event) => {
    let target = event.target;
    let id = target.dataset.ref;
    
    if(target.dataset.type == 'delete'){
      fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
        .then(res => { 
          let tr = d.getElementById(`books_${id}`)
          tr.remove();
          console.log(res); 
        })
        .catch( err => console.log(err))
    }
  })
: null