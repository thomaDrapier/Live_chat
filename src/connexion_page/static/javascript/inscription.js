let log = console.log
export function setupDOMListeners() {
    let submit_button = document.querySelector(".submit");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let first_name = document.querySelector(".first_name");
    let first_name_text = document.querySelector(".first_name_text");
    let incorrect_empty_first_name = document.querySelector(".incorrect_empty_first_name")

    let namee = document.querySelector(".name");
    let namee_text = document.querySelector(".name_text")
    let incorrect_empty_namee = document.querySelector(".incorrect_empty_name")

    let username = document.querySelector(".username");
    let username_text = document.querySelector(".username_text")
    let incorrect_empty_username = document.querySelector("incorrect_empty_username")

    let email = document.querySelector(".email")
    let email_text = document.querySelector(".email_text")
    let incorrect_empty_email = document.querySelector("incorrect_empty_email")

    let password = document.querySelector(".password");
    let password_text = document.querySelector(".password_text")
    let incorrect_empty_password = document.querySelector(".incorrect_empty_password")

    let password_confirmation = document.querySelector(".password_confirmation")
    let password_confirmation_text = document.querySelector(".password_confirmation_text")
    let incorrect_empty_password_confirmation = document.querySelector(".incorrect_empty_password_confirmation")

    return ({
        first_name : first_name ,
        first_name_text : first_name_text,
        incorrect_empty_first_name,

        name : namee,
        name_text : namee_text,
        incorrect_empty_name : incorrect_empty_namee,

        email : email,
        email_text : email_text,
        incorrect_empty_email : incorrect_empty_email,

        username : username,
        username_text : username_text,
        incorrect_empty_uusername : username,

        password : password,
        password_text : password_text,
        incorrect_empty_password : incorrect_empty_password,

        password_confirmation : password_confirmation,
        password_confirmation_text : password_confirmation_text,
        incorrect_empty_password_confirmation : incorrect_empty_password_confirmation,

        submit_button : submit_button,
        csrfToken : csrfToken}
    )}

let inputs = setupDOMListeners()


export default function empty_incorrect_field(...args){
/**
 * args -> input fields : (first_name, name, email...)
 * check if all fields have been fullfilled and are correct (email)
 * return a dict {value : 'boolean', empty_fields : 'list', incorrect_fields : list }
 * value : false -> all fields are fullfilled and correct (empty_fields & incorrect_fields are empty)
 * value : true -> not all fields are fullfilled or correct 
 */
    let incorrect_empty_fields = []
    let correct_fields = []
    let email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    for (let arg of args){
        // check for empty fields
        if (arg.value == ""){
            incorrect_empty_fields.push(arg.name)
        }
        // email validity check
        else if (arg.name === "email") {
            if (email_pattern.test(arg.value) === false && incorrect_empty_fields.includes("email") === false) {
                incorrect_empty_fields.push("email")
            }
        }
        else {
            correct_fields.push(arg.name)
        }   
        
    }
    if (incorrect_empty_fields == 0){
        return {value : false, incorrect_empty_fields : incorrect_empty_fields, correct_fields : correct_fields}
    } else {
        return {value : true, incorrect_empty_fields : incorrect_empty_fields, correct_fields : correct_fields}
}}


export function submit_button_event(){
    inputs.submit_button.addEventListener('click', function(){
        let url = window.location.href
        let fields = empty_incorrect_field(
            inputs.first_name,
            inputs.name,
            inputs.email,
            inputs.password_confirmation,
            inputs.password,
            inputs.username
        )
    
        if (fields.value === false){
            log("youpi")
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    first_name: inputs.first_name.value,
                    name: inputs.name.value,
                    email : inputs.email.value,
                    username: inputs.username.value,
                    password: inputs.password.value
                }),
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                    "X-CSRFToken": inputs.csrfToken
    
                }})
                .then(response => {
                    if (response.redirected) {
                        let redirectTo = response.url;
                        window.location.href = redirectTo;
                    }
                })
            
            }
        else {
            console.log("Erreur dans les formulaires")
            for (let field of fields.incorrect_empty_fields){
                document.querySelector(`.incorrect_empty_${field}`).classList.add('show')
                document.querySelector(`.${field}`).classList.add('border_not_good')
                document.querySelector(`.${field}`).value = ""
            }
            for (let field of fields.correct_fields){
                if (document.querySelector(`.${field}`).classList.contains('border_not_good')){
                    document.querySelector(`.${field}`).classList.remove('border_not_good')
                }
                document.querySelector(`.${field}`).classList.add('border_good')
            }
        }
        })
        }

submit_button_event()
// ----------------------------CSS Effect----------------------------------------

function effect(input_zone, input_text){
    input_zone.addEventListener('focus', function(){
        input_text.classList.add('focuse_text')
        input_zone.classList.add('border_effect')
    })
    input_zone.addEventListener('blur', function(){
        if (input_zone.value == ""){
            input_text.classList.remove('focuse_text')
            input_zone.classList.remove('border_effect')
        }
    })
}

function inputs_animation(){
    effect(inputs.first_name, inputs.first_name_text)
    effect(inputs.name, inputs.name_text)
    effect(inputs.username, inputs.username_text)
    effect(inputs.password, inputs.password_text)
    effect(inputs.password_confirmation, inputs.password_confirmation_text)
    effect(inputs.email, inputs.email_text)
}

inputs_animation()

