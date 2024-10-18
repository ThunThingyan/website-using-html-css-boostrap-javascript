function validateField(field) {
    if (field.value === "") {
        field.style.borderColor = "red";
        showError(field, field.placeholder, "cannot be empty.");
        return false;
    }
    clearError(field);
    return true;
}

function validateUsername(field) {
    let pattern = /^[a-zA-Z ]{2,30}$/;
    if (!pattern.test(field.value)) {
        field.style.borderColor = "red";
        showError(field, "Username must be 2-30 letters and spaces.");
        return false;
    }
    clearError(field);
    return true;
}

function validateMobile(field) {
    let pattern = /^[0-9]{10}$/;
    if (!pattern.test(field.value)) {
        field.style.borderColor = "red";
        showError(field, "Enter a valid 10-digit mobile number.");
        return false;
    }
    clearError(field);
    return true;
}

function validateEmail(field) {
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(field.value)) {
        field.style.borderColor = "red";
        showError(field, "Enter a valid email address.");
        return false;
    }
    clearError(field);
    return true;
}

function validatePassword(field) {
    let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!pattern.test(field.value)) {
        field.style.borderColor = "red";
        showError(
            field,
            "Password must be 8+ characters with uppercase, lowercase, and a number."
        );
        return false;
    }
    clearError(field);
    return true;
}

function validatePin(field) {
    let pattern = /^[0-9]{6}$/;
    if (!pattern.test(field.value)) {
        field.style.borderColor = "red";
        showError(field, "PIN code must be 6 digits.");
        return false;
    }
    clearError(field);
    return true;
}

function validateDate(field) {
    if (field.value === "") {
        field.style.borderColor = "red";
        showError(field, "Date cannot be empty.");
        return false;
    }

    let selectedDate = new Date(field.value);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        field.style.borderColor = "red";
        showError(field, "Date cannot be in the past.");
        return false;
    }
    clearError(field);
    return true;
}

function showError(field, message) {
    let error = field.nextElementSibling;
    if (error) error.remove();

    let errorSpan = document.createElement("span");
    errorSpan.style.color = "red";
    errorSpan.textContent = message;
    field.parentNode.insertBefore(errorSpan, field.nextSibling);
}

function clearError(field) {
    let error = field.nextElementSibling;
    if (error) error.remove();
    field.style.borderColor = "";
}

function handleLogin(event) {
    event.preventDefault();

    let username = event.target.querySelector('input[name="username"]').value;
    let password = event.target.querySelector('input[type="password"]').value;

    if (username === "admin" && password === "123") {
        console.log("Admin login successful. Redirecting to admin.page...");
        window.location.href = "manageorder.html"; 
    } else {
        console.log("User login successful. Redirecting to home.html...");
        window.location.href = "home.html";
    }
}

function validateForm(event) {
    event.preventDefault();

    let fields = event.target.querySelectorAll("input");
    let isValid = true;

    fields.forEach((field) => {
        if (field.name === "username") isValid = validateUsername(field) && isValid;
        else if (field.name === "mobile") isValid = validateMobile(field) && isValid;
        else if (field.type === "email") isValid = validateEmail(field) && isValid;
        else if (field.type === "password") isValid = validatePassword(field) && isValid;
        else if (field.name === "pin") isValid = validatePin(field) && isValid;
        else if (field.name === "date") isValid = validateDate(field) && isValid;
        else isValid = validateField(field) && isValid;
    });

    if (isValid) {
        console.log("All fields are valid. Submitting the form...");
        event.target.submit();
    }
}

let forms = ["signupForm", "loginForm", "contactForm", "cartForm"];

forms.forEach((formId) => {
    let form = document.getElementById(formId);
    if (form) {
        if (formId === "loginForm") {
            form.addEventListener("submit", handleLogin);
        } else {
            form.addEventListener("submit", validateForm);
        }

        form.querySelectorAll("input").forEach((field) => {
            field.addEventListener("input", () => {
                if (field.name === "username") validateUsername(field);
                else if (field.name === "mobile") validateMobile(field);
                else if (field.type === "email") validateEmail(field);
                else if (field.type === "password") validatePassword(field);
                else if (field.name === "pin") validatePin(field);
                else if (field.name === "date") validateDate(field);
                else validateField(field);
            });
        });
    }
});
