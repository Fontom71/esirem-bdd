class SuccessView {
  static boxDialog = document.getElementById("box-dialog");
  static successCount = 0;
  static maxSuccess = 3;

  static displaySuccess(msg) {
    if (this.successCount >= this.maxSuccess) return;

    const successMsg = document.createElement("div");
    successMsg.classList.add("success-notification");
    successMsg.innerHTML = `${msg} <div class="progress-bar"><div class="progress"></div></div>`;

    this.boxDialog.appendChild(successMsg);
    this.successCount++;

    setTimeout(() => {
      successMsg.classList.add("show");
    }, 10);

    const progressBar = successMsg.querySelector(".progress");
    let width = 100;
    const interval = setInterval(() => {
      width -= 2;
      progressBar.style.width = width + "%";
      if (width <= 0) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      successMsg.classList.remove("show");
      setTimeout(() => {
        this.boxDialog.removeChild(successMsg);
        this.successCount--;
      }, 500);
    }, 5000);
  }
}

export default SuccessView;
