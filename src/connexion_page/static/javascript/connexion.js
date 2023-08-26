let password = document.querySelector('.password')
let username = document.querySelector('.username')
let submit = document.querySelector('.submit')
let label_username = document.querySelector(".username_label")
let label_password = document.querySelector(".password_label")
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
let incorrect = document.querySelector('.incorrect')
console.log(incorrect)

submit.addEventListener('click', function(){
    let url = window.location.href
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            password: password.value,
            username: username.value
        }),
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "X-CSRFToken": csrfToken

        }})
        .then(response => {
            if (response.status == 401) {
                console.log('connection interdite')
                incorrect.classList.add('show');
                username.value = "";
                password.value = "";
                throw new Error('Connection interdite');
            }
            if (response.redirected) {
                let redirectTo = response.url;
                window.location.href = redirectTo;
            }
        })
    console.log("data has been send")
})

// -----------------------------------------ANIMATIONS-----------------------------------------------

username.addEventListener('focus', function(){
    label_username.classList.add('focused')
    console.log("class ajouté")
})

username.addEventListener('blur', function(){
    if (username.value != ""){
        
    }
    else {
        label_username.classList.remove('focused')
        console.log("classe enlevé")
    }
    
})

password.addEventListener('focus', function(){
    label_password.classList.add('focused')
    console.log("class ajouté")
})

password.addEventListener('blur', function(){
    if (password.value != ""){
        
    }
    else {
        label_password.classList.remove('focused')
        console.log("classe enlevé")
    }
})

submit.addEventListener('mouseover', function(){
    submit.classList.add('hover')
})

submit.addEventListener('mouseout', function(){
    submit.classList.remove('hover')
})