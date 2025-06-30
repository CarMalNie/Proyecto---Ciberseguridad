// Aseguramos que el código se ejecute cuando el DOM esté listo, usando la sintaxis de jQuery
$(document).ready(function() {
    // --- Lógica del Cuestionario Existente ---
    const questionModalElement = document.getElementById('questionModal');
    const questionModal = new bootstrap.Modal(questionModalElement);
    let questionModalLabel = document.getElementById('questionModalLabel'); 
    let questionTextElement = document.getElementById('questionText');
    let trueBtn = document.getElementById('trueBtn');
    let falseBtn = document.getElementById('falseBtn');
    let feedbackDiv = document.getElementById('feedback');
    let nextQuestionBtn = document.getElementById('nextQuestionBtn');

    const questions = [
        {
            title: "Pregunta N°1: Phishing",
            text: "¿El phishing es un ataque donde los delincuentes suplantan identidades legítimas para robar información sensible?",
            correctAnswer: true,
            explanation: "El phishing se basa en la suplantación de identidad para engañar y obtener datos privados como contraseñas o datos bancarios."
        },
        {
            title: "Pregunta N°2: Ransomware",
            text: "¿El ransomware es un programa que te pide permiso antes de cifrar tus archivos?",
            correctAnswer: false,
            explanation: "El ransomware cifra tus archivos sin permiso y exige un rescate por su liberación."
        },
        {
            title: "Pregunta N°3: Malware",
            text: "¿El malware es un término general que solo incluye virus informáticos?",
            correctAnswer: false,
            explanation: "El malware es un término amplio que abarca virus, troyanos, gusanos, ransomware, spyware, etc."
        },
        {
            title: "Pregunta N°4: Ataques DDoS",
            text: "¿Un ataque DDoS busca sobrecargar un servidor enviándole una gran cantidad de solicitudes legítimas?",
            correctAnswer: false,
            explanation: "Un ataque DDoS utiliza tráfico FALSO o malicioso desde múltiples fuentes para sobrecargar el servidor y denegar el servicio."
        },
        {
            title: "Pregunta N°5: Ciberseguridad",
            text: "¿La ciberseguridad es el conjunto de herramientas, políticas y medidas para proteger la información y los sistemas digitales?",
            correctAnswer: true,
            explanation: "La ciberseguridad abarca un amplio rango de prácticas y tecnologías destinadas a proteger redes, dispositivos y programas de ataques digitales."
        }
    ];

    let currentQuestionIndex = 0; 
    let userScore = 0; 

    function loadQuestion() {
        if (!questionModalLabel || !questionTextElement || !feedbackDiv || !trueBtn || !falseBtn || !nextQuestionBtn) {
            console.error('Uno o más elementos del DOM del cuestionario no se encontraron.');
            return;
        }

        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            questionModalLabel.textContent = q.title; 
            questionTextElement.textContent = q.text; 
            
            feedbackDiv.innerHTML = '';
            feedbackDiv.className = 'mt-3'; 
            trueBtn.disabled = false;
            falseBtn.disabled = false;
            nextQuestionBtn.style.display = 'none'; 
        } else {
            showFinalResults();
        }
    }

    function showFinalResults() {
        const headerContent = `
            <h5 class="modal-title">Cuestionario Finalizado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
        questionModalElement.querySelector('.modal-header').innerHTML = headerContent;

        questionModalElement.querySelector('.modal-body').innerHTML = `
            <p class="fs-4 text-center">¡Has completado el cuestionario!</p>
            <p class="fs-5 text-center">Tu puntuación final es: <span class="fw-bold">${userScore}</span> de <span class="fw-bold">${questions.length}</span>.</p>
        `;
        questionModalElement.querySelector('.modal-footer').innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar Cuestionario</button>
        `;
    }

    questionModalElement.addEventListener('show.bs.modal', function () {
        currentQuestionIndex = 0; 
        userScore = 0; 

        questionModalElement.querySelector('.modal-header').innerHTML = `
            <h5 class="modal-title" id="questionModalLabel"></h5> 
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
        questionModalElement.querySelector('.modal-body').innerHTML = `
            <p id="questionText"></p>
            <div class="d-grid gap-2 col-6 mx-auto mt-4">
                <button type="button" class="btn btn-success" id="trueBtn">Verdadero</button>
                <button type="button" class="btn btn-danger" id="falseBtn">Falso</button>
            </div>
            <div id="feedback" class="mt-3"></div>
        `;
        questionModalElement.querySelector('.modal-footer').innerHTML = `
            <button type="button" class="btn btn-primary" id="nextQuestionBtn">Siguiente</button>
        `;
        
        questionModalLabel = document.getElementById('questionModalLabel');
        questionTextElement = document.getElementById('questionText');
        trueBtn = document.getElementById('trueBtn');
        falseBtn = document.getElementById('falseBtn');
        feedbackDiv = document.getElementById('feedback');
        nextQuestionBtn = document.getElementById('nextQuestionBtn');

        trueBtn.onclick = () => handleAnswer(true);
        falseBtn.onclick = () => handleAnswer(false);
        nextQuestionBtn.onclick = handleNextQuestion;

        loadQuestion(); 
    });

    function handleAnswer(userAnswer) {
    const q = questions[currentQuestionIndex];
    let feedbackMessagePrefix = '';

    feedbackDiv.classList.remove('feedback-correct', 'feedback-incorrect');

    if (userAnswer === q.correctAnswer) {
        feedbackMessagePrefix = '¡Correcto! ';
        feedbackDiv.classList.add('feedback-correct');
        userScore++;
    } else {
        feedbackMessagePrefix = '¡Incorrecto! ';
        feedbackDiv.classList.add('feedback-incorrect');
    }

    feedbackDiv.innerHTML = feedbackMessagePrefix + q.explanation;

    // Deshabilita ambos botones después de que se selecciona una respuesta
    trueBtn.disabled = true;
    falseBtn.disabled = true;

    nextQuestionBtn.style.display = 'block';

    if (currentQuestionIndex === questions.length - 1) {
        nextQuestionBtn.textContent = 'Finalizar';
    } else {
        nextQuestionBtn.textContent = 'Siguiente';
    }
}

    function handleNextQuestion() {
        currentQuestionIndex++; 
        loadQuestion(); 
        
        if (currentQuestionIndex >= questions.length) {
            showFinalResults();
        }
    }

    if (trueBtn) trueBtn.onclick = () => handleAnswer(true);
    if (falseBtn) falseBtn.onclick = () => handleAnswer(false);
    if (nextQuestionBtn) nextQuestionBtn.onclick = handleNextQuestion;


    // --- Lógica del Formulario de Suscripción con jQuery ---
    const $subscribeForm = $('#subscribeForm');
    const $userNameInput = $('#userName');
    const $userEmailInput = $('#userEmail');

    // Referencia al modal de éxito
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const $successModalBody = $('#successModal .modal-body'); // Elemento para el mensaje del modal

    if ($subscribeForm.length) {
        $subscribeForm.on('submit', function(event) {
            event.preventDefault();

            // Resetear validación visual de Bootstrap
            $subscribeForm.removeClass('was-validated');
            $userNameInput.removeClass('is-valid is-invalid');
            $userEmailInput.removeClass('is-valid is-invalid');

            let isValid = true;

            // Validación de Nombre
            if ($userNameInput.val().trim() === '') {
                $userNameInput.addClass('is-invalid');
                isValid = false;
            } else {
                $userNameInput.addClass('is-valid');
            }

            // Validación de Correo Electrónico
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test($userEmailInput.val().trim())) {
                $userEmailInput.addClass('is-invalid');
                isValid = false;
            } else {
                $userEmailInput.addClass('is-valid');
            }

            if (isValid) {
                const name = $userNameInput.val().trim();

                // Mostrar mensaje de éxito en el modal
                $successModalBody.html(`¡Gracias por suscribirte, <strong>${name}</strong>!`);
                successModal.show(); // Mostrar el modal

                $subscribeForm[0].reset();
                $subscribeForm.removeClass('was-validated'); 
            } else {
                // Si no es válido, Bootstrap se encargará de mostrar los mensajes invalid-feedback
                $subscribeForm.addClass('was-validated'); 
            }
        });
    }
});