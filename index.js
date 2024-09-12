const { select, input, checkbox } = require('@inquirer/prompts')

let goal = {
  value: 'Tomar 3L de água por dia',
  checked: false,
}

let goals = [ goal ]

const createGoal = async () => {
  const goal = await input({ message: "Digite a meta:"})

  if(goal.length == 0) {
    console.log('A meta não pode ser vazia.')
    return
  }

  goals.push(
    { value: goal, checked: false }
  )
}

const listGoals = async () => {
  const responses = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...goals],
    instructions: false,
  })

  if(responses.length == 0) {
    console.log("Nenhuma meta selecionada!")
    return
  }

  goals.forEach((m) => {
    m.checked = false
  })

  responses.forEach((resposta) => {
    const goal = goals.find((m) => {
      return m.value == resposta
    })

    goal.checked = true
  })

  console.log('Meta(s) marcadas como concluída(s)')
}

const start = async () => {
  while(true){ 
    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch(option) {
      case "cadastrar":
        await createGoal()
        console.log(goals)
        break
      case "listar":
        await listGoals()
        break
      case "sair":
        console.log('Até a próxima!')
        return
    }
  }
}

start();