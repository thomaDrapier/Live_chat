
import empty_incorrect from "../inscription.js"
console.log("hello")
let namee = document.querySelector('.name')
let first_name = document.querySelector('.first_name')
let email = document.querySelector('.email')

namee.value = "zdsx"
first_name.value = ""
email.value = "vfcdx.frd@rfvcdcom"

console.log(empty_incorrect(namee, first_name, email))

// console.log(empty(name, first_name, email).empty_fields.length)
// console.log(empty(name, first_name, email).incorrect_fields)
// console.log(empty(name, first_name, `${email}`).value)
