/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })
  })
})

// Test création de nouvelle facture
// Ajout de fichier
// Quand connecté sur la page employé, la page devrait contenir: envoyer une note de frais
// Tester le form
// Quand j'ajoute une image, l'input doit changer
// En cliquant sur submit, la bills devrait être envoyée