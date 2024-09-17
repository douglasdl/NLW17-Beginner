const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let message = "Bem vindo ao App de Metas";

let goals

const loadGoals = async () => {
  try {
    const data = await fs.readFile("goals.json", "utf-8")
    goals = JSON.parse(data)
  }
  catch (erro) {
    goals = []
  }
}

const saveGoals = async () => {
  await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

const createGoal = async () => {
    const goal = await input({ message: "Digite a meta:" })

    if (goal.length == 0) {
      message = 'A meta não pode ser vazia.'
      return
    }

    goals.push(
      { value: goal, checked: false }
    )
    message = "Meta cadastrada com sucesso!"
}

const listGoals = async () => {
    if (goals.length == 0) {
      message = "Não existem metas!"
      return
    }

    const answers = await checkbox({
      message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
      choices: [...goals],
      instructions: false,
    })

    goals.forEach((m) => {
      m.checked = false
    })

    if (answers.length == 0) {
      message = "Nenhuma meta selecionada!"
      return
    }

    answers.forEach((answer) => {
      const goal = goals.find((m) => {
        return m.value == answer
      })

      goal.checked = true
    })

    message = 'Meta(s) marcada(s) como concluída(s)'
}

const completedGoals = async () => {
    if (goals.length == 0) {
      message = "Não existem metas!"
      return
    }

    const completed = goals.filter((goal) => {
        return goal.checked
    })

    if (completed.length == 0) {
      message = 'Não existem metas realizadas! :('
      return
    }

    await select({
      message: "Metas Realizadas: " + completed.length,
      choices: [...completed]
    })
}

const openedGoals = async () => {
  if (goals.length == 0) {
    message = "Não existem metas!"
    return
  }

  const opened = goals.filter((goal) => {
    return goal.checked != true
  })

  if (opened.length == 0) {
    message = 'Não existem metas abertas! :)'
    return
  }

  await select({
    message: "Metas Abertas: " + opened.length,
    choices: [...opened]
  })
}

const deleteGoals = async () => {
  if(goals.length == 0) {
    message = "Não existem metas!"
    return
  }

  const uncheckedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  const itemsToDelete = await checkbox({
    message: "Selecione item para deletar",
    choices: [...uncheckedGoals],
    instructions: false,
  })

  if (itemsToDelete.length == 0) {
    message = "Nenhum item para deletar!"
    return
  }

  itemsToDelete.forEach((item) => {
    goals = goals.filter((goal) => {
      return goal.value != item
    })
  })

  message = "Meta(s) deleta(s) com sucesso!"
}

const showMessage = () => {
  console.clear();

  if (message != "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const start = async () => {
  await loadGoals()

  while (true) {
    showMessage()
    await saveGoals()

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
          name: "Metas realizadas",
          value: "realizadas"
        },
        {
          name: "Metas abertas",
          value: "abertas"
        },
        {
          name: "Deletar metas",
          value: "deletar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    })

    switch (option) {
      case "cadastrar":
        await createGoal()
        break
      case "listar":
        await listGoals()
        break
      case "realizadas":
        await completedGoals()
        break
      case "abertas":
        await openedGoals()
        break
      case "deletar":
        await deleteGoals()
        break
      case "sair":
        console.log('Até a próxima!')
        return
    }
  }
}

start();