// Hello World!
console.log("Hello World!")


// variables - let
let messages = "Hello World!"


// variables - const
const menssage = "Hello, me"
{
    const menssage = "Hello, Douglas!"
    console.log(menssage)
}
console.log(menssage);


// arrays
let goals00 = ['Douglas', 'hello']
let goals01 = [2, 'Douglas']
// concatenate values
console.log(goals00[1] + ", " + goals00[0]) 

let goals02 = [
    goals01,
    {
        value: 'caminhar 20 minutos todos os dias',
        checked: false
    }
]
console.log(goals02[1].value);

// objects
let goals = {
    value: 'ler um livro por mês',
    address: 2,
    checked: true,
    isChecked: () => {
        console.log(info)
    }
}
console.log(goals.value);

// function // arrow function
const createGoal = () => {}

// named function
function createGoals() {}