class Dialog {
  #message = "Default Message";
  #options = ["close"];
  constructor(message, options) {
    if (options.length > 3) {
      options.length = 3;
    }
    this.#message = message;
    this.#options = options;
    this.#open();
  }

  #open() {
    const body = document.querySelector("body");
    body.insertAdjacentHTML("afterbegin", "<div class='bg_modal'></div>");
    const bgModal = document.querySelector(".bg_modal");
    bgModal.addEventListener("click", this.#close.bind(this));
    bgModal.insertAdjacentHTML(
      "afterbegin",
      `<div onclick='(function(e){ e.stopPropagation() }(arguments[0]))' class='modal'>
        <p class='modal__title' onclick='(function(e){ e.stopPropagation() }(arguments[0]))'>
            ${this.#message}
        </p>
        <div class='options'></div>
      </div>`
    );
    const options = document.querySelector(".modal .options");
    this.#options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add(...["button", "default", "bordered"]);
      button.textContent = option;
      button.addEventListener("click", this.#sendMessage.bind(this, option));
      options.appendChild(button);
    });
  }

  #sendMessage(message) {
    const result = document.querySelector(".return_message");
    result.textContent = `You just clicked '${message}'`;
    this.#close();
  }

  #close() {
    const bgModal = document.querySelector(".bg_modal");
    bgModal.remove();
  }
}
