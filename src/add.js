const closeBtn = document.getElementById("closeBtn");
const updateBtn = document.getElementById("updateBtn");

closeBtn.addEventListener("click", () => {
    window.close();
});

updateBtn.addEventListener("click", async() => {
    const notifyval = document.getElementById("notifyval");
    const value = notifyval.value;
    await window.electronAPI.setValue(value);
    window.close();
});