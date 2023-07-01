const openModalHandler = (e) => {
  if (!dialogCanBeOpened) {
    return;
  }
  document.dispatchEvent(new Event("canPause"));
  document.querySelector("#" + e.detail).showModal();
};

const resumeGame = () => {
  dialogCanBeOpened = false;
  dialogs.forEach((dialog) => dialog.close());
  const resumeEvent = new Event("resume");
  document.dispatchEvent(resumeEvent);
  setTimeout(() => {
    dialogCanBeOpened = true;
  }, 1000);
};

let dialogCanBeOpened = true;

const dialogs = document.querySelectorAll("dialog");
const resumeBtns = document.querySelectorAll(".resume-btn");

// document.querySelector("#configurator").showModal();
document.addEventListener("openModal", openModalHandler);
resumeBtns.forEach((btn) => btn.addEventListener("click", resumeGame));
