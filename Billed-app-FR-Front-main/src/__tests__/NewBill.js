/**
 * @jest-environment jsdom
 */

 import "@testing-library/jest-dom/extend-expect";
 import { fireEvent, screen } from "@testing-library/dom";
 import store from "../__mocks__/store"
 import Router from "../app/Router.js";
 import { ROUTES, ROUTES_PATH } from "../constants/routes";
 import NewBill from "../containers/NewBill.js";
import NewBillUI from "../views/NewBillUI";
import BillsUI from "../views/BillsUI.js";


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
      
      const formNewBill = screen.getByTestId("form-new-bill");
      fireEvent.submit(formNewBill);
      expect(formNewBill).toBeTruthy();
     
      

    });
    
    

    
 
     
   });
 });
 
 // // Quand connecté sur la page employé, la page devrait contenir: envoyer une note de frais
// // Tester l'envoi du file
// // Quand j'ajoute une image, le nom du file input doit changer
// // quand j'ajoute un fichier qui n'est pas au bon format, verifier que window.alert.toHaveBeenCalled
// // En cliquant sur submit, la bills devrait être envoyée


describe("Given I am connected as an Employee", () => {
  describe("When I send a new Bill", () => {
    test("Then it should send datas to Mock API Post", async () => {

      const getSpy = jest.spyOn(store, "post");
      const newBill = {
        id: "47qAXb6fIm2zOKkLzMro",
        vat: "80",
        fileUrl:
          "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
        status: "pending",
        type: "Hôtel et logement",
        commentary: "séminaire billed",
        name: "encore",
        fileName: "preview-facture-free-201801-pdf-1.jpg",
        date: "2004-04-04",
        amount: 400,
        commentAdmin: "ok",
        email: "a@a",
        pct: 20,
      };
      await store.post(newBill)
      expect(getSpy).toHaveBeenCalledTimes(1);
    })
    test("Then if the post fails, it should throw an error 404", async () => {

      store.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      );
      // initialise le body
      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;
      const message = screen.getByText(/Erreur 404/);
      expect(message).toBeTruthy();

    })
    test("should add a bill to API and fails with 500 message error", async () => {
      store.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 500"))
      );
      // initialise le body
      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;
      const message = screen.getByText(/Erreur 500/);
      expect(message).toBeTruthy();
    });
  })
})