document.addEventListener("DOMContentLoaded", () => {
  console.log(1);
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const closeModelBtn = document.querySelector(".closeModelBtn");
  const saveModelBtn = document.querySelector(".saveModelBtn");
  const deleteTrigger = document.getElementById("deleteTrigger");
  const closeIcon = document.getElementById("closeIcon");

  let deleteId = null;

  for (let btn of deleteBtn) {
    btn.addEventListener("click", () => {
      $("#exampleModal").modal("show");
      deleteId = $(btn).data("id");
    });
  }

  closeModelBtn.addEventListener("click", () => {
    deleteId = null;
    $("#exampleModal").modal("hide");
  });
  closeIcon.addEventListener("click", () => {
    deleteId = null;
    $("#exampleModal").modal("hide");
  });

  saveModelBtn.addEventListener("click", () => {
    if (deleteId) {
      const deleteProductForm = document.getElementById("deleteProductForm");
      const deleteProductId = document.getElementById("deleteProductId");
      deleteProductId.value = deleteId;
      deleteProductForm.submit();
      deleteId = null;
    }
  });
});
