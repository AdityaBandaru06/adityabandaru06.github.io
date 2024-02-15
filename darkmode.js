
document.addEventListener("DOMContentLoaded", function() {
    var theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
        document.querySelector("#theme-toggle button").textContent = "Light Mode";
    }
    document.getElementById("theme-toggle").addEventListener("click", function() {
        document.body.classList.toggle("dark");
        var button = document.querySelector("#theme-toggle button");
        if (document.body.classList.contains("dark")) {
            button.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        } else {
            button.textContent = "Dark Mode";
            localStorage.removeItem("theme");
        }
        button.style.cursor = "pointer";
    });
});
