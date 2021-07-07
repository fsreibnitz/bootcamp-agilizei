/// <reference types="cypress" />

context("Listagem", () => {
  it("Listagem sem registro", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/api/1/databases/userdetails/collections/newtable?*",
      status: 200,
      response: "fx:webTable-empty",
    }).as("getNewTable");

    cy.visit("WebTable.html");
    cy.get("div[role=row]").should("have.length", "1");
  });

  it("Listagem com apenas um regsitro", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "**/api/1/databases/userdetails/collections/newtable?*",
      status: 200,
      response: "fx:webTable-get-unico",
    }).as("getNewTable");

    cy.visit("WebTable.html");

    cy.get("div[role=row] div[role=gridcell]")
      .eq(4)
      .find("div")
      .as("gridCellPhone");
    cy.get("@gridCellPhone").should("contain.text", "9980161200");

    //1 -> .first()
    //2
    //3
    //4 -> .eq(3)
    //5  -> .last()
  });
});
