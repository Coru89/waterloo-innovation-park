export namespace form {
  const formEl = document.querySelector("#form");
  const buttonEl: HTMLButtonElement | null = document.querySelector('.forms__submit');

  // this creates unique subject lines and appends 'from [name]'
  if (formEl) {
    formEl.addEventListener("submit", function (e: Event) {

      // avoid double submission
      if (buttonEl) {
        buttonEl.disabled = true;
        buttonEl.classList.add('forms__submit--loading');
      }

      const subject = formEl.querySelector(
        "input[name=subject]"
      ) as HTMLInputElement;

      const fromName = (
        formEl.querySelector("input[name=fromName]") as HTMLInputElement
      ).value;

      // Set dynamic subject line to avoid Gmail making a conversation thread and hiding text
      subject.value = `${subject.dataset.originalValue} from ${fromName}`;
    });
  }
}
