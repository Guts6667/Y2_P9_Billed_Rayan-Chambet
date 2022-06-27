/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, window } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import exp from "constants";


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the page should contain 'Envoyer une note de frais' ", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
      //to-do write assertion
      


    })
  })
})
// Quand connecté sur la page employé, la page devrait contenir: envoyer une note de frais
// Tester l'envoi du file
// Quand j'ajoute une image, le nom du file input doit changer
// quand j'ajoute un fichier qui n'est pas au bon format, verifier que window.alert.toHaveBeenCalled
// En cliquant sur submit, la bills devrait être envoyée
