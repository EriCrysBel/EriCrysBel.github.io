document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("lig-ZjVkTatVjfObZ"); // Reemplaza con tu User ID de EmailJS

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = sanitizeInput(document.getElementById("nombre").value);
        const email = sanitizeInput(document.getElementById("email").value);
        const mensaje = sanitizeInput(document.getElementById("mensaje").value);

        if (!validateEmail(email)) {
            showPopup("Por favor, ingrese un correo electrónico válido.", "error");
            return;
        }

        if (nombre.length < 3 || mensaje.length < 10) {
            showPopup("El nombre debe tener al menos 3 caracteres y el mensaje al menos 10.", "error");
            return;
        }

        const serviceID = "service_etggut4";
        const templateID = "template_kvm8e8j";

        const templateParams = { nombre, email, mensaje };

        emailjs.send(serviceID, templateID, templateParams)
            .then(response => {
                showPopup("Mensaje enviado con éxito!", "success");
                document.getElementById("contact-form").reset();
            })
            .catch(error => {
                showPopup("Error al enviar el mensaje, inténtalo nuevamente.", "error");
                console.error(error);
            });
    });

    function sanitizeInput(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function showPopup(message, type) {
        const popup = document.createElement("div");
        popup.className = `popup ${type}`;
        popup.textContent = message;
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.style.opacity = "0";
            setTimeout(() => popup.remove(), 500);
        }, 3000);
    }

    document.querySelector(".marketing-btn").addEventListener("click", function() {
        showPopup("SERVICIO DISPONIBLE PRÓXIMAMENTE ", "info");
    });
});
