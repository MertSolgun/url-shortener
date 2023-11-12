const ShortBtn = document.querySelector(".ShortBtn");
const textArea = document.getElementById("textToCopy");
const targetUrlElement = document.querySelector(".targetUrl");
const smContainer = document.querySelector(".smContainer");
const inputElement = document.getElementById("link");
const removBtn = document.querySelector(".removeBtn");
const copyBtn = document.querySelector(".copyBtn");

let url;

window.addEventListener("load", () => {
  const getTextarea = localStorage.getItem("textArea");
  const getTargetUrl = localStorage.getItem("targetUrl");
  const getUrl = localStorage.getItem("url");
  const getInputUrl = localStorage.getItem("inputUrl");

  const copyBtnDisplay = localStorage.getItem("copyBtnDisplay");
  const targetUrlDisplay = localStorage.getItem("targetUrlDisplay");

  if (copyBtnDisplay) {
    copyBtn.style.display = copyBtnDisplay;
  }

  if (targetUrlDisplay) {
    targetUrlElement.style.display = targetUrlDisplay;
  }

  if (getTextarea) {
    textArea.textContent = JSON.parse(getTextarea);
  }
  if (getTargetUrl) {
    targetUrlElement.href = JSON.parse(getTargetUrl);
  }
  if (getUrl) {
    url = JSON.parse(getUrl);
  }
  if (getInputUrl) {
    inputElement.value = JSON.parse(getInputUrl);
  }
});

async function getData() {
  ShortBtn.addEventListener("click", async () => {
    const inputUrl = document.getElementById("link").value;

    if (!inputUrl.trim()) {
      Swal.fire({
        position: "top",
        icon: "warning",
        title: `
            The input field empyty.
              `,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      try {
        const data = await fetch(
          `https://tinyurl.com/api-create.php?url=` +
            encodeURIComponent(inputUrl)
        );
        const responseText = await data.text();
        if (data.ok) {
          textArea.textContent = responseText;
          targetUrlElement.href = responseText;

          localStorage.setItem(
            "textArea",
            JSON.stringify(textArea.textContent)
          );
          localStorage.setItem(
            "targetUrl",
            JSON.stringify(targetUrlElement.href)
          );

          localStorage.setItem("url", JSON.stringify(responseText));
          localStorage.setItem("inputUrl", JSON.stringify(inputUrl));
          copyBtn.style.display = "flex";
          targetUrlElement.style.display = "flex";
          localStorage.setItem("copyBtnDisplay", "flex");
          localStorage.setItem("targetUrlDisplay", "flex");
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: `
                Please enter valid link..
                  `,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

getData();

removBtn.addEventListener("click", () => {
  localStorage.removeItem("textArea");
  localStorage.removeItem("targetUrl");
  localStorage.removeItem("url");
  localStorage.removeItem("inputUrl");
  textArea.textContent = "";
  targetUrlElement.href = "#";
  inputElement.value = "";

  targetUrlElement.style.display = "none";
  copyBtn.style.display = "none";
  localStorage.setItem("copyBtnDisplay", "none");
  localStorage.setItem("targetUrlDisplay", "none");
});

function copyToClipboard() {
  var textToCopy = document.getElementById("textToCopy");
  textToCopy.select();
  textToCopy.setSelectionRange(0, 99999);

  document.execCommand("copy");

  if (textToCopy.value === "") {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: `
        You haven't done any copying yet.
        `,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "top",
      icon: "success",
      title: `Copy: ${textToCopy.value}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
