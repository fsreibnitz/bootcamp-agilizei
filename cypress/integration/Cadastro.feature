Feature: Cadastro

	Como usuário, desejo realizar um cadastro
	Para que possa acessar o sistema

	Scenario: Cadastro de usuario no site
		Given que acesso o site
		When informar meus dados
		And salvar
		Then devo ser cadastrado com sucesso

#Given / Dado -> contexto
#When / Quando -> ação executada
#Then ? Entao -> resultado esperado
#And / E -> continuidade do passo anterior