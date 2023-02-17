const closeBtn = document.getElementById("closeBtn");
const updateBtn = document.getElementById("updateBtn");


closeBtn.addEventListener("click", () => {
    window.close();
});


updateBtn.addEventListener("click", () => {
    const notifyval = document.getElementById("notifyval");
    const value = notifyval.value;
    window.electronAPI.setValue(value);
});