//implementação dos passos descitos na features

let Chance = require("chance");
let chance = new Chance();
Given(/^que acesso o site$/, () => {
	cy.server();
	cy.route({
		method: "POST",
		 url: "**/api/1/databases/userdetails/collections/newtable?*",
		status: 200,
		response: {}
	}).as("postNewTable");
	cy.route( {
		method:"POST",
		url: "**/api/1/databases/userdetails/collections/usertable?*",
		status: 200,
		response:{}
	}).as("postUserTable");
	cy.route({
		method:"GET",
		url: "**/api/1/databases/userdetails/collections/newtable?*",
		status:200,
		response:{}
	}).as(
		"getNewTable"
	);

	cy.visit("Register.html");
});


When(/^informar meus dados$/, () => {
	cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model="LastName"]').type(chance.last());
    cy.get('input[ng-model="EmailAdress"]').type(chance.email());
    cy.get(" input[ng-model^=Phone]").type(chance.phone({ formatted: false }));

    // check - >radios e chekbox
    cy.get("input[value=FeMale]").check();
    cy.get("input[type=checkbox").check("Cricket");
    cy.get("input[type=checkbox").check("Hockey");

    //select -> select e select2 (combos)
    cy.get("select#Skills").select("Javascript");
    cy.get("select#countries").select("Argentina");
    cy.get("select#country").select("Australia", { force: true });
    cy.get("select#yearbox").select("1981");
    cy.get("select[ng-model^=month]").select("March");
    cy.get("select#daybox").select("11");
    cy.get("input#firstpassword").type("Agilisei2020");
    cy.get("input#secondpassword").type("Agilisei2020");
    // atccahFile
    cy.get("input#imagesrc").attachFile("image.png");

});

When(/^salvar$/, () => {
	 //click button
	 cy.get("button#submitbtn").click();

});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait("@postNewTable").then((resNewTable) => {
		//chai
		expect(resNewTable.status).to.eq(200);
	});
	cy.wait("@postUserTable").then((resUserTable) => {
		expect(resUserTable.status).to.eq(200);
	});
	cy.wait("@getNewTable").then((resNewTable) => {
		expect(resNewTable.status).to.eq(200);
	});
	cy.url().should("contain", "WebTable");
});
