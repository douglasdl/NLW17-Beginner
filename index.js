let goal = {
  value: 'Ler um livro por mês',
  checked: false
}
let goals = [
  goal,
  {
    value: 'Caminhar 20 minutos todos os dias',
    checked: false
  }
]

function createGoal() {
  console.log(goals[0].value)
}

createGoal()

