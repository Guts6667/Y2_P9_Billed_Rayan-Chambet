/**
 * @jest-environment jsdom
 */

 import "@testing-library/jest-dom/extend-expect";
 import { fireEvent, screen } from "@testing-library/dom";
 import userEvent from "@testing-library/user-event";
 import store from "../__mocks__/store"
 import Router from "../app/Router.js";
 import { ROUTES, ROUTES_PATH } from "../constants/routes";
 import NewBill from "../containers/NewBill.js";
 import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills";
 
 describe("Given I am connected as an employee", () => {
   describe("When I am on NewBill Page", () => {
     beforeEach(() => {
       const user = JSON.stringify({
         type: "Employee",
         email: "a@a",
       });
       window.localStorage.setItem("user", user);
 
       const pathname = ROUTES_PATH["NewBill"];
       Object.defineProperty(window, "location", {
         value: {
           hash: pathname,
         },
       });
 
       document.body.innerHTML = `<div id="root"></div>`;
       Router();
     });
 
     it("Then it should require the input type date", () => {
       const inputDate = screen.getByTestId("datepicker");
       expect(inputDate).toBeRequired();
     });
     it("Then it should require the input type number amount", () => {
       const inputAmount = screen.getByTestId("amount");
       expect(inputAmount).toBeRequired();
     });
     it("Then it should require the input type number pct", () => {
       const inputPct = screen.getByTestId("pct");
       expect(inputPct).toBeRequired();
     });
     it("Then it should require the input type file", () => {
       const inputfile = screen.getByTestId("file");
       expect(inputfile).toBeRequired();
     });
     
   });

 
   describe("When I fill the form", () => {
     it("Then it should not be submitted if the format is incorrect", async () => {
       const onNavigate = (pathname) => {
         document.body.innerHTML = ROUTES({ pathname });
       };
 
       const myNewBill = new NewBill({
         document,
         onNavigate,
         store,
         localStorage: window.localStorage,
       });
 
       const blob = new Blob(["text"], { type: "image/txt" });
       const file = new File([blob], "file.txt", { type: "image/txt" });
       const inputFile = screen.getByTestId("file");
       const handleChangeFile = jest.fn((e) => myNewBill.handleChangeFile(e));
       inputFile.addEventListener("change", handleChangeFile);
       fireEvent.change(inputFile, {
         target: {
           files: [file],
         },
       });
 
 
       expect(handleChangeFile).toHaveBeenCalledTimes(1);
       expect(myNewBill.type).toBe(undefined);
     });
     it("Then it should be submitted if everything is correct", async () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const myNewBill = new NewBill({
        document,
        onNavigate,
        store,
        localStorage: window.localStorage,
      });

      const blob = new Blob(["text"], { type: "image/jpg" });
      const file = new File([blob], "file.jpg", { type: "image/jpg" });
      const inputFile = screen.getByTestId("file");
      const handleChangeFile = jest.fn((e) => myNewBill.handleChangeFile(e));
      inputFile.addEventListener("change", handleChangeFile);
      fireEvent.change(inputFile, { target: { files: [file], }, });
      expect(handleChangeFile).toHaveBeenCalledTimes(1);
      expect(myNewBill.type).toBeDefined();
      

      const formNewBill = screen.getByTestId("form-new-bill");
      // const inputExpenseType = screen.getByTestId("expense-type");
      // const inputExpenseName = screen.getByTestId("expense-name");
      // const inputAmount = screen.getByTestId("amount");
      // const inputVat = screen.getByTestId("vat");
      // const inputCommentary = screen.getByTestId("commentary");
      

    });
    //  it("Then the browser should display an alert if the file uploaded has an wrong format", async () => {
    //   const onNavigate = (pathname) => {
    //     document.body.innerHTML = ROUTES({ pathname });
    //   };

    //   const myNewBill = new NewBill({
    //     document,
    //     onNavigate,
    //     store,
    //     localStorage: window.localStorage,
    //   });

    //   const blob = new Blob(["text"], { type: "image/txt" });
    //   const file = new File([blob], "file.txt", { type: "txt" });
    //   const inputFile = screen.getByTestId("file");
    //   const handleChangeFile = jest.fn((e) => myNewBill.handleChangeFile(e));
    //   inputFile.addEventListener("change", handleChangeFile);
    //   fireEvent.change(inputFile, {
    //     target: {
    //       files: [file],
    //     },
    //   });


    //   expect(handleChangeFile).toHaveBeenCalledTimes(1);
    //   await new Promise((alert) => setTimeout(alert, 2000));
    //   expect(window.alert).toBeDefined();
    // });
 
     
   });
 });
 
 // // Quand connecté sur la page employé, la page devrait contenir: envoyer une note de frais
// // Tester l'envoi du file
// // Quand j'ajoute une image, le nom du file input doit changer
// // quand j'ajoute un fichier qui n'est pas au bon format, verifier que window.alert.toHaveBeenCalled
// // En cliquant sur submit, la bills devrait être envoyée



// const onNavigate = (pathname) => {
//   document.body.innerHTML = ROUTES({ pathname });
// };
// describe("Given I am connected as an employee", () => {
//   describe("When I am on NewBill Page", () => {
//     test("Then the page should render a form ", () => {
//       const html = NewBillUI();
//       document.body.innerHTML = html;
//       //to-do write assertion
//       const formNewBill = screen.getAllByTestId("form-new-bill");
//       expect(formNewBill).toBeTruthy();

//       const inputExpenseType = screen.getByTestId("expense-type");
//       expect(inputExpenseType.value).toBe("Transports");

//       const inputExpenseName = screen.getByTestId("expense-name");
//       expect(inputExpenseName.value).toBe("");
      
//       const inputDate = screen.getByTestId("datepicker");
//       expect(inputDate.value).toBe("");

//       const inputAmount = screen.getByTestId("amount");
//       expect(inputAmount.value).toBe("");

//       const inputVat = screen.getByTestId("vat");
//       expect(inputVat.value).toBe("");

//       const inputPct = screen.getByTestId("pct");
//       expect(inputPct.value).toBe("");

//       const inputCommentary = screen.getByTestId("commentary");
//       expect(inputCommentary.value).toBe("");

//       const inputFile= screen.getByTestId("file");
//       expect(inputFile.value).toBe("");
//     })
//   })
//   describe("When I am on NewBill Page and I fill the input file", () => {
//     test('Then I should be able to submit', () => {

//       const inputFile = screen.getByTestId("file");
      
//       expect(inputFile.value).toBe("ginkgo.png")
      
      
//     })
//   })
// })
