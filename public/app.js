let delBtns = document.querySelectorAll(".btn-danger");
let dialog = document.querySelector("#confirm-dialog");
let cancelBtn = document.querySelector("#cancel-delete");
let confirmBtn = document.querySelector("#confirm-delete");
let deleteForm = null;

for (let delBtn of delBtns) {
  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteForm = delBtn.closest(".delete-form");
    dialog.showModal();
  });
}

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

confirmBtn.addEventListener("click", () => {
  if (deleteForm) {
    deleteForm.submit();
  }
});
