// Manual Interactivo HPV III - Versión Final Optimizada
// Programa Habilidades para la Vida III - JUNAEB 2025

// ===== CONFIGURACIÓN GLOBAL =====
const SECTIONS = ['intro', 'vinculacion', 'modelo', 'deteccion', 'acciones', 'galeria', 'rol', 'evaluacion'];
let currentSection = 0;
let initialized = false;

// Estado de usuario (temporal - se reinicia al cerrar)
let userData = {
    reflections: {},
    answers: {},
    progress: 0,
    completedActivities: [],
    formData: {},
    quizScores: {},
    areas: {
        vinculacion: { score: 0, maxScore: 0, questions: [] },
        modelo: { score: 0, maxScore: 0, questions: [] },
        deteccion: { score: 0, maxScore: 0, questions: [] },
        acciones: { score: 0, maxScore: 0, questions: [] },
        rol: { score: 0, maxScore: 0, questions: [] }
    },
    sessionInfo: {
        startDate: null,
        lastActivity: null,
        timeSpent: 0,
        completionDate: null
    }
};

// Variables del quiz
let currentQuizQuestion = 0;
let quizAnswers = [];

// ===== DATOS DEL QUIZ FINAL =====
const finalQuizQuestions = [
    // ÁREA: VINCULACIÓN ESCOLAR
    {
        question: "¿Cuáles son los tres pilares de la vinculación escolar según el manual HPV III?",
        options: [
            "Comportamientos, Emociones y Afectos, Cogniciones",
            "Promoción, Prevención, Especialización",
            "Estudiantes, Profesores, Familias",
            "Detección, Intervención, Seguimiento"
        ],
        correct: 0,
        area: "vinculacion",
        explanation: "Los tres pilares son: Comportamientos (acciones concretas como seguir normas y participar), Emociones y Afectos (lo que siente en el liceo), y Cogniciones (lo que piensa sobre su aprendizaje y autoeficacia)."
    },
    {
        question: "Según el manual, la vinculación escolar es descrita como:",
        options: [
            "Un método de evaluación académica",
            "La 'energía en acción' que conecta al estudiante con su vida en el liceo",
            "Un sistema de disciplina escolar",
            "Una estrategia de enseñanza específica"
        ],
        correct: 1,
        area: "vinculacion",
        explanation: "La vinculación escolar es la 'energía en acción' que conecta al estudiante con su vida en el liceo, actuando como un verdadero 'antídoto' contra la desmotivación y el abandono escolar."
    },
    
    // ÁREA: MODELO MULTINIVEL
    {
        question: "¿Qué porcentaje de estudiantes cubre el Nivel I (Promocional)?",
        options: [
            "20-30% de estudiantes",
            "3-12% de estudiantes", 
            "100% de estudiantes",
            "50% de estudiantes"
        ],
        correct: 2,
        area: "modelo",
        explanation: "El Nivel I (Promocional) cubre al 100% de la comunidad educativa, creando un ambiente protector para todos."
    },
    {
        question: "¿Cuál es el objetivo del Nivel III (Especializado)?",
        options: [
            "Promoción general de habilidades",
            "Prevención grupal de riesgos",
            "Apoyo individual y especializado para estudiantes con riesgo alto",
            "Capacitación de profesores"
        ],
        correct: 2,
        area: "modelo",
        explanation: "El Nivel III se enfoca en apoyo individual y especializado para pocos estudiantes (3-12%) con riesgo alto."
    },

    // ÁREA: SISTEMA DE DETECCIÓN  
    {
        question: "¿Cuáles son los tres ámbitos fundamentales que evalúa el Sistema de Detección de HPV III?",
        options: [
            "Desarrollo Psicosocial, Compromiso Escolar, Trayectoria Educativa",
            "Rendimiento, Asistencia, Conducta",
            "Familia, Escuela, Comunidad",
            "Individual, Grupal, Institucional"
        ],
        correct: 0,
        area: "deteccion",
        explanation: "El Sistema de Detección evalúa tres ámbitos: Desarrollo Psicosocial (PSC-Y-17), Compromiso Escolar (SEI), y Trayectoria Educativa (datos SIGE)."
    },
    {
        question: "El PSC-Y-17 adaptado para Chile evalúa cuántos ítems y cuál es su punto de corte total?",
        options: [
            "15 ítems, punto de corte ≥ 12",
            "17 ítems, punto de corte ≥ 15", 
            "20 ítems, punto de corte ≥ 18",
            "12 ítems, punto de corte ≥ 10"
        ],
        correct: 1,
        area: "deteccion",
        explanation: "El PSC-Y-17 tiene 17 ítems que evalúan tres dimensiones, y un punto de corte total ≥ 15 indica riesgo de deterioro psicosocial."
    },

    // ÁREA: ACCIONES DEL PROGRAMA
    {
        question: "¿Qué intervención corresponde a un estudiante con riesgo alto en Compromiso Escolar?",
        options: [
            "Taller Preventivo",
            "Mentoría (Nivel III)",
            "Plan Promocional", 
            "Reforzamiento de Contenidos"
        ],
        correct: 1,
        area: "acciones",
        explanation: "Según el manual, un riesgo alto en Compromiso Escolar requiere Mentoría (Nivel III) para brindar apoyo persistente a través del vínculo con un adulto significativo."
    },
    {
        question: "¿Qué tipo de intervención se aplica a estudiantes con riesgo medio en Trayectoria Educativa?",
        options: [
            "Derivación a redes de atención",
            "Plan Individual de Reforzamiento",
            "Reforzamiento de Contenidos y Habilidades (Nivel II)",
            "Mentoría especializada"
        ],
        correct: 2,
        area: "acciones",
        explanation: "Los estudiantes con riesgo medio en Trayectoria Educativa (promovidos pero en el 10-15% de promedios más bajos) reciben Reforzamiento de Contenidos y Habilidades de Nivel II."
    },

    // ÁREA: FUNDAMENTOS DEL PROGRAMA
    {
        question: "¿Cuántos años de implementación continua tiene HPV III según el manual?",
        options: [
            "15 años desde 2010",
            "20 años desde 2005",
            "27 años desde 1998",
            "30 años desde 1995"
        ],
        correct: 2,
        area: "rol",
        explanation: "HPV III tiene 27 años de implementación continua desde 1998, representando un modelo consolidado de intervención psicosocial en el ámbito educativo chileno."
    },
    {
        question: "Según el manual, ¿qué caracteriza la implementación 2025 de HPV III?",
        options: [
            "Un programa piloto experimental",
            "Un modelo consolidado con experiencia probada y enfoque basado en evidencia",
            "Una iniciativa privada sin respaldo estatal",
            "Un sistema de evaluación únicamente"
        ],
        correct: 1,
        area: "rol",
        explanation: "La implementación 2025 se caracteriza por ser un modelo consolidado con 27 años de experiencia, articulación territorial con entidades especializadas, y enfoque basado en evidencia usando instrumentos validados."
    }
];

// ===== RETROALIMENTACIÓN POR ÁREAS =====
const areaFeedback = {
    vinculacion: {
        name: "Vinculación Escolar",
        icon: "🎯",
        excellent: "¡Excelente comprensión de la vinculación escolar! Dominas los tres pilares y su importancia como antídoto contra el abandono escolar.",
        good: "Buen entendimiento de la vinculación escolar. Refuerza el conocimiento sobre los tres pilares y cómo se manifiestan en la práctica.",
        needsWork: "Es importante profundizar en el concepto de vinculación escolar. Revisa los tres pilares: Comportamientos, Emociones y Afectos, y Cogniciones.",
        studyTips: [
            "Revisa la sección 'El Corazón del Programa: La Vinculación Escolar'",
            "Practica identificando ejemplos de cada pilar en situaciones reales",
            "Reflexiona sobre cómo la vinculación actúa como 'antídoto' contra la deserción"
        ]
    },
    modelo: {
        name: "Modelo Multinivel", 
        icon: "📊",
        excellent: "¡Perfecto! Comprendes claramente la estructura del modelo multinivel y las poblaciones objetivo de cada nivel.",
        good: "Buen manejo del modelo multinivel. Considera repasar los porcentajes específicos y objetivos de cada nivel.",
        needsWork: "Necesitas reforzar el modelo multinivel. Es fundamental entender que Nivel I=100%, Nivel II=20-30%, Nivel III=3-12%.",
        studyTips: [
            "Memoriza los porcentajes: Nivel I (100%), Nivel II (20-30%), Nivel III (3-12%)",
            "Entiende que es una 'pirámide invertida' de apoyo",
            "Practica clasificando casos según el nivel de intervención requerido"
        ]
    },
    deteccion: {
        name: "Sistema de Detección",
        icon: "🔍", 
        excellent: "¡Excelente! Manejas correctamente los instrumentos de detección y sus criterios de aplicación.",
        good: "Buen conocimiento del sistema de detección. Refuerza los puntos de corte específicos del PSC-Y-17.",
        needsWork: "Debes estudiar más el sistema de detección. Es crucial conocer el PSC-Y-17 y sus puntos de corte (≥15 total).",
        studyTips: [
            "Memoriza: PSC-Y-17 con punto de corte ≥15 para riesgo psicosocial",
            "Estudia las tres dimensiones: internalizantes (≥5), atención (≥7), externalizantes",
            "Comprende la diferencia entre PSC-Y-17, SEI y datos de SIGE"
        ]
    },
    acciones: {
        name: "Acciones del Programa",
        icon: "🛠️",
        excellent: "¡Perfecto dominio de las acciones! Conoces bien las modalidades, duraciones y poblaciones objetivo.",
        good: "Buen conocimiento de las acciones. Repasa las especificaciones técnicas de cada intervención.",
        needsWork: "Necesitas estudiar más las acciones específicas del programa. Cada intervención tiene características muy precisas.",
        studyTips: [
            "Memoriza: Taller Preventivo (6-10 estudiantes), Mentoría (dupla estable 6+ meses)",
            "Diferencia entre Nivel II (grupal) y Nivel III (individual/especializado)",
            "Estudia las cargas horarias y frecuencias de cada intervención"
        ]
    },
    rol: {
        name: "Fundamentos del Programa",
        icon: "🏛️",
        excellent: "¡Excelente! Comprendes la historia, consolidación y base técnica del programa HPV III.",
        good: "Buen conocimiento de los fundamentos. Refuerza datos específicos sobre la implementación y experiencia del programa.",
        needsWork: "Es importante que conozcas la historia y fundamentos del programa para transmitir confianza y credibilidad.",
        studyTips: [
            "Memoriza: 27 años de implementación continua desde 1998",
            "Entiende que es un modelo consolidado, no experimental",
            "Estudia la articulación territorial y enfoque basado en evidencia"
        ]
    }
};

// ===== FUNCIONES PRINCIPALES =====

function updateProgressIndicator() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!progressFill || !progressText) return;
    
    // Calcular progreso basado en la sección actual
    // La introducción (sección 0) muestra 0%, luego aumenta por cada sección visitada
    let progress;
    if (currentSection === 0) {
        // Introducción = 0%
        progress = 0;
    } else if (currentSection === SECTIONS.length - 1) {
        // Evaluación final = 87.5% (se completará a 100% cuando termine el quiz)
        progress = 87.5;
    } else {
        // Otras secciones: progreso gradual
        progress = (currentSection / SECTIONS.length) * 100;
    }
    
    // Actualizar barra de progreso
    progressFill.style.width = `${progress}%`;
    
    // Actualizar texto de progreso
    progressText.textContent = `${Math.round(progress)}%`;
    
    // Agregar clase para animación si está cerca del final
    if (progress >= 90) {
        progressFill.classList.add('nearly-complete');
    }
    
    // Actualizar estado en userData
    userData.progress = progress;
}

function showSection(sectionId) {
    if (!SECTIONS.includes(sectionId)) {
        return;
    }
    
    try {
        // Ocultar todas las secciones
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección objetivo
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            return;
        }
        
        // Actualizar navegación
        const allLinks = document.querySelectorAll('.nav-link');
        allLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Actualizar índice actual
        currentSection = SECTIONS.indexOf(sectionId);
        
        // Actualizar indicador de progreso
        updateProgressIndicator();
        
        // Inicializar quiz si es la sección de evaluación
        if (sectionId === 'evaluacion') {
            setTimeout(() => {
                createFinalQuiz();
            }, 100);
        }
        
        // Scroll al top
        window.scrollTo(0, 0);
        
    } catch (error) {
        // Error silencioso para producción
    }
}

function setupNavigation() {
    try {
        // Enlaces del menú lateral
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.removeEventListener('click', handleNavClick);
            link.addEventListener('click', handleNavClick);
        });
        
        // Botones de navegación
        const nextButtons = document.querySelectorAll('.btn-next');
        nextButtons.forEach(btn => {
            btn.removeEventListener('click', nextSection);
            btn.addEventListener('click', nextSection);
        });
        
        const prevButtons = document.querySelectorAll('.btn-prev');
        prevButtons.forEach(btn => {
            btn.removeEventListener('click', prevSection);
            btn.addEventListener('click', prevSection);
        });
        
    } catch (error) {
        // Error silencioso para producción
    }
}

function handleNavClick(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('data-section');
    showSection(sectionId);
}

function nextSection() {
    if (currentSection < SECTIONS.length - 1) {
        currentSection++;
        showSection(SECTIONS[currentSection]);
    }
}

function prevSection() {
    if (currentSection > 0) {
        currentSection--;
        showSection(SECTIONS[currentSection]);
    }
}

// ===== FUNCIONES INTERACTIVAS =====

function saveReflection(textareaId) {
    try {
        const textarea = document.getElementById(textareaId);
        if (textarea && textarea.value.trim()) {
            userData.reflections[textareaId] = textarea.value.trim();
            showNotification('Reflexión guardada correctamente', 'success');
        } else {
            showNotification('Por favor, escribe tu reflexión antes de guardar', 'warning');
        }
    } catch (error) {
        // Error silencioso para producción
        showNotification('Error al guardar reflexión', 'error');
    }
}

function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        const colors = {
            success: '#48BB78',
            warning: '#ED8936',
            error: '#F56565',
            info: '#4299E1'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
    } catch (error) {
        // Error silencioso para producción
    }
}

// ===== FUNCIONES INTERACTIVAS ADICIONALES =====

function togglePillar(element) {
    try {
        element.classList.toggle('active');
    } catch (error) {
        // Error silencioso para producción
    }
}

function toggleLevel(element) {
    try {
        element.classList.toggle('expanded');
    } catch (error) {
        // Error silencioso para producción
    }
}

function toggleDetection(element) {
    try {
        element.classList.toggle('expanded');
    } catch (error) {
        // Error silencioso para producción
    }
}

function toggleAccordion(element) {
    try {
        const item = element.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const icon = element.querySelector('.fas');
        
        item.classList.toggle('active');
        
        if (content.style.display === 'block') {
            content.style.display = 'none';
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        } else {
            content.style.display = 'block';
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function checkAnswer(element, result) {
    try {
        const questionDiv = element.closest('.quiz-question');
        const feedbackDiv = questionDiv.querySelector('.feedback');
        const options = questionDiv.querySelectorAll('.quiz-option');
        
        options.forEach(opt => opt.disabled = true);
        
        if (result === 'correct') {
            element.classList.add('correct');
            feedbackDiv.innerHTML = '<div class="feedback-correct">¡Correcto! 🎉</div>';
        } else {
            element.classList.add('wrong');
            feedbackDiv.innerHTML = '<div class="feedback-wrong">Incorrecto. Revisa la explicación. 📚</div>';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function evaluateRisk() {
    try {
        const psico = document.getElementById('riesgo-psico').checked;
        const compromiso = document.getElementById('riesgo-compromiso').checked;
        const trayectoria = document.getElementById('riesgo-trayectoria').checked;
        const feedback = document.getElementById('risk-feedback');
        
        let message = '';
        if (psico && compromiso && trayectoria) {
            message = '<div class="feedback-excellent">¡Excelente! Identificaste los tres tipos de riesgo presentes en este caso. Ana necesita intervención en múltiples niveles.</div>';
        } else if (psico || compromiso || trayectoria) {
            message = '<div class="feedback-good">Bien, pero hay más riesgos que identificar. Considera todos los antecedentes presentados.</div>';
        } else {
            message = '<div class="feedback-wrong">Revisa nuevamente el caso. Hay múltiples indicadores de riesgo presentes.</div>';
        }
        
        feedback.innerHTML = message;
    } catch (error) {
        // Error silencioso para producción
    }
}

// ===== FUNCIONES AUXILIARES =====

function loadCase() {
    try {
        const select = document.getElementById('caseSelect');
        const details = document.getElementById('case-details');
        const title = document.getElementById('case-title');
        const description = document.getElementById('case-description');
        
        const cases = {
            case1: {
                title: 'Carlos - Problemas de conducta',
                description: 'Carlos, 14 años, presenta frecuentes disrupciones en clase, ha sido suspendido 2 veces este año. Sus padres reportan conflictos en casa. Promedio académico: 5.2'
            },
            case2: {
                title: 'María - Bajo rendimiento',
                description: 'María, 15 años, tiene un promedio de 4.0, falta frecuentemente a clases. Vive solo con su abuela. Se ve desmotivada y poco participativa.'
            },
            case3: {
                title: 'Pedro - Riesgo de deserción',
                description: 'Pedro, 16 años, reprobó el año anterior. Asistencia 45%. Su familia enfrenta problemas económicos y él trabaja medio tiempo.'
            }
        };
        
        if (select.value && cases[select.value]) {
            const caseData = cases[select.value];
            title.textContent = caseData.title;
            description.textContent = caseData.description;
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function validatePlan() {
    try {
        const selectedLevel = document.querySelector('input[name="intervention"]:checked');
        const feedback = document.getElementById('plan-feedback');
        const caseSelect = document.getElementById('caseSelect');
        
        if (!selectedLevel) {
            feedback.innerHTML = '<div class="feedback-warning">⚠️ Por favor, selecciona un nivel de intervención.</div>';
            return;
        }
        
        if (!caseSelect || !caseSelect.value) {
            feedback.innerHTML = '<div class="feedback-warning">⚠️ Por favor, selecciona un caso primero.</div>';
            return;
        }
        
        const level = selectedLevel.value;
        const caseId = caseSelect.value;
        
        // Análisis específico por caso
        const caseAnalysis = {
            case1: { // Carlos - Problemas de conducta
                correct: 'nivel2',
                feedback: {
                    nivel1: '⚠️ <strong>Incorrecto.</strong> Carlos presenta problemas conductuales específicos que requieren intervención preventiva. El Nivel I es muy general para sus necesidades.',
                    nivel2: '✅ <strong>¡Correcto!</strong> Carlos necesita un Taller Preventivo (Nivel II) para desarrollar competencias socioemocionales y manejo de conducta.',
                    nivel3: '⚠️ <strong>Demasiado intensivo.</strong> Carlos no muestra riesgo tan alto como para requerir apoyo individual especializado.'
                },
                recommendation: 'Recomendación: Taller Preventivo de competencias socioemocionales con énfasis en autorregulación y habilidades interpersonales.'
            },
            case2: { // María - Bajo rendimiento
                correct: 'nivel2',
                feedback: {
                    nivel1: '⚠️ <strong>Insuficiente.</strong> María necesita apoyo específico más allá de las acciones promocionales generales.',
                    nivel2: '✅ <strong>¡Correcto!</strong> María se beneficiaría del Reforzamiento de Contenidos y Habilidades (Nivel II) para mejorar su rendimiento académico.',
                    nivel3: '⚠️ <strong>Todavía no necesario.</strong> Primero intentar con apoyo grupal antes de intervención individual.'
                },
                recommendation: 'Recomendación: Reforzamiento de Contenidos y Habilidades con énfasis en técnicas de estudio y autogestión académica.'
            },
            case3: { // Pedro - Riesgo de deserción
                correct: 'nivel3',
                feedback: {
                    nivel1: '❌ <strong>Muy insuficiente.</strong> Pedro presenta múltiples factores de riesgo alto que requieren atención especializada urgente.',
                    nivel2: '⚠️ <strong>Insuficiente.</strong> El apoyo grupal no es suficiente para el nivel de riesgo de Pedro.',
                    nivel3: '✅ <strong>¡Correcto!</strong> Pedro requiere Mentoría individual (Nivel III) y posible derivación a redes de apoyo socioeconómico.'
                },
                recommendation: 'Recomendación: Mentoría individual inmediata + coordinación con redes de apoyo para abordar factores socioeconómicos.'
            }
        };
        
        const analysis = caseAnalysis[caseId];
        const isCorrect = level === analysis.correct;
        const specificFeedback = analysis.feedback[level];
        
        let feedbackHTML = '';
        
        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-excellent">
                    ${specificFeedback}
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.3);">
                        <strong>📋 ${analysis.recommendation}</strong>
                    </div>
                </div>
            `;
        } else {
            feedbackHTML = `
                <div class="feedback-wrong">
                    ${specificFeedback}
                    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.3);">
                        <strong>💡 Sugerencia:</strong> Revisa los criterios de cada nivel y considera todos los factores de riesgo presentados.
                    </div>
                </div>
            `;
        }
        
        feedback.innerHTML = feedbackHTML;
        
        setTimeout(() => {
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
    } catch (error) {
        // Error silencioso para producción
    }
}

function finishManual() {
    // Marcar manual como completado
    userData.sessionInfo.completionDate = new Date().toISOString();
    userData.sessionInfo.manualCompleted = true;
    
    // Mensaje de finalización exitosa
    const message = `
        ¡Felicitaciones! Has completado exitosamente el Manual Interactivo HPV III.
        
        📋 Resumen de tu sesión:
        • Evaluación final completada
        • Retroalimentación personalizada recibida  
        • Manual revisado completamente
        
        🎯 Estás listo para implementar el programa HPV III.
        
        ¿Deseas cerrar el manual?
    `;
    
    if (confirm(message)) {
        // Mostrar mensaje final de éxito
        document.body.innerHTML = `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 2rem;
            ">
                <div style="
                    background: rgba(255,255,255,0.1);
                    padding: 3rem;
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255,255,255,0.2);
                    max-width: 600px;
                ">
                    <h1 style="font-size: 3rem; margin-bottom: 1rem;">🎉</h1>
                    <h2 style="margin-bottom: 1rem; color: #fff;">¡Manual HPV III Completado!</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem; line-height: 1.6;">
                        Has finalizado exitosamente tu capacitación en el programa 
                        <strong>Habilidades para la Vida III</strong> de JUNAEB.
                    </p>
                    <div style="
                        background: rgba(255,255,255,0.1);
                        padding: 1.5rem;
                        border-radius: 10px;
                        margin-bottom: 2rem;
                        text-align: left;
                    ">
                        <h3 style="margin-bottom: 1rem;">✅ Logros obtenidos:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li>📚 Manual interactivo completado</li>
                            <li>🎯 Evaluación final realizada</li>
                            <li>💡 Retroalimentación personalizada recibida</li>
                            <li>🛠️ Ejercicios prácticos completados</li>
                        </ul>
                    </div>
                    <p style="font-size: 1rem; opacity: 0.9; margin-bottom: 2rem;">
                        Ahora estás preparado para implementar las intervenciones de HPV III 
                        con confianza y conocimiento sólido del programa.
                    </p>
                    <div style="margin-top: 2rem;">
                        <button onclick="window.close()" style="
                            background: #48BB78;
                            color: white;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 25px;
                            font-size: 1.1rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">🏠 Cerrar Manual</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function restartManual() {
    if (confirm('¿Estás seguro de que quieres reiniciar el manual? Se perderá todo tu progreso.')) {
        location.reload();
    }
}

// ===== FUNCIONES ADICIONALES =====

function saveSelfcarePlan() {
    try {
        const physical = document.getElementById('selfcare-physical').value;
        const emotional = document.getElementById('selfcare-emotional').value;
        const professional = document.getElementById('selfcare-professional').value;
        
        if (physical || emotional || professional) {
            userData.formData.selfcarePlan = {
                physical: physical,
                emotional: emotional,
                professional: professional
            };
            showNotification('Plan de autocuidado guardado correctamente', 'success');
        } else {
            showNotification('Por favor, completa al menos una estrategia', 'warning');
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function openModal(imageSrc, title, description) {
    try {
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modal && modalImage && modalTitle && modalDescription) {
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.style.display = 'block';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function closeModal() {
    try {
        const modal = document.getElementById('photoModal');
        if (modal) {
            modal.style.display = 'none';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function toggleFullscreen() {
    try {
        const modal = document.getElementById('photoModal');
        if (!document.fullscreenElement) {
            modal.requestFullscreen().catch(err => {
                // Error silencioso para producción
            });
        } else {
            document.exitFullscreen();
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

// ===== FUNCIONES DE EVALUACIÓN =====

function calculateAreaScores() {
    Object.keys(userData.areas).forEach(area => {
        userData.areas[area] = { score: 0, maxScore: 0, questions: [] };
    });
    
    finalQuizQuestions.forEach((question, index) => {
        if (question.area) {
            userData.areas[question.area].maxScore++;
            userData.areas[question.area].questions.push(index);
            
            if (userData.answers[`quiz_${index}`] === question.correct) {
                userData.areas[question.area].score++;
            }
        }
    });
}

function generateFeedback() {
    calculateAreaScores();
    
    let totalScore = 0;
    let totalQuestions = finalQuizQuestions.length;
    let weakAreas = [];
    let strongAreas = [];
    
    Object.keys(userData.areas).forEach(areaKey => {
        const area = userData.areas[areaKey];
        const feedback = areaFeedback[areaKey];
        
        if (area.maxScore > 0) {
            const percentage = (area.score / area.maxScore) * 100;
            totalScore += area.score;
            
            if (percentage >= 80) {
                area.level = 'excellent';
                area.message = feedback.excellent;
                strongAreas.push(feedback.name);
            } else if (percentage >= 60) {
                area.level = 'good';
                area.message = feedback.good;
            } else {
                area.level = 'needsWork';
                area.message = feedback.needsWork;
                weakAreas.push(feedback.name);
            }
            
            area.percentage = percentage;
            area.feedback = feedback;
        }
    });
    
    const overallPercentage = (totalScore / totalQuestions) * 100;
    
    return {
        totalScore,
        totalQuestions,
        overallPercentage,
        weakAreas,
        strongAreas,
        areas: userData.areas
    };
}

function generateEvaluationRecommendations(results) {
    const container = document.getElementById('evaluationRecommendations');
    if (!container) {
        console.error('Container evaluationRecommendations no encontrado');
        return;
    }
    
    console.log('Generando retroalimentación para resultados:', results);
    
    // Generar recomendaciones personalizadas
    
    // HTML consolidado con toda la retroalimentación
    let fullFeedbackHTML = `
        <!-- Resumen General -->
        <div class="feedback-summary">
            <div class="overall-feedback">
                ${results.overallPercentage >= 80 ? 
                    `<div class="recommendation-card excellent">
                        <h4>🎉 ¡Excelente Evaluación!</h4>
                        <p>Obtuviste ${results.overallPercentage.toFixed(0)}% de respuestas correctas. Demuestras un dominio sólido de los conceptos fundamentales de HPV III. Estás preparado para implementar el programa con confianza.</p>
                    </div>` :
                results.overallPercentage >= 60 ?
                    `<div class="recommendation-card good">
                        <h4>👍 Buen Desempeño</h4>
                        <p>Obtuviste ${results.overallPercentage.toFixed(0)}% de respuestas correctas. Manejas bien los conceptos principales, pero hay algunas áreas que requieren reforzamiento antes de la implementación.</p>
                    </div>` :
                    `<div class="recommendation-card needs-work">
                        <h4>📚 Requiere Estudio Adicional</h4>
                        <p>Obtuviste ${results.overallPercentage.toFixed(0)}% de respuestas correctas. Es recomendable revisar el manual completo y solicitar capacitación adicional antes de implementar HPV III.</p>
                    </div>`
                }
            </div>
        </div>
    `;
    
    // Agregar recomendaciones específicas por respuestas incorrectas
    let specificRecommendations = [];
    try {
        specificRecommendations = generateAnswerSpecificRecommendations();
    } catch (error) {
        console.error('Error generando recomendaciones específicas:', error);
        specificRecommendations = [];
    }
    // Procesar recomendaciones específicas
    if (specificRecommendations.length > 0) {
        const specificHTML = specificRecommendations.map(rec => `
            <div class="recommendation-card ${rec.type}">
                <h4>${rec.title}</h4>
                <p>${rec.content}</p>
                ${rec.action ? `<div class="recommendation-action">💡 <strong>Acción:</strong> ${rec.action}</div>` : ''}
            </div>
        `).join('');
        
        fullFeedbackHTML += `
            <div class="specific-errors-section">
                <h4 style="margin: 2rem 0 1rem 0; color: #f56565;">🎯 Errores Específicos a Corregir:</h4>
                ${specificHTML}
            </div>
        `;
    }
    
    // Agregar análisis de patrones si hay múltiples errores
    if (specificRecommendations.length >= 2) {
        let patternRecommendations = [];
        try {
            patternRecommendations = analyzeErrorPatterns();
        } catch (error) {
            console.error('Error analizando patrones:', error);
            patternRecommendations = [];
        }
        if (patternRecommendations.length > 0) {
            const patternHTML = patternRecommendations.map(rec => `
                <div class="recommendation-card ${rec.type}">
                    <h4>${rec.title}</h4>
                    <p>${rec.content}</p>
                    ${rec.action ? `<div class="recommendation-action">💡 <strong>Acción:</strong> ${rec.action}</div>` : ''}
                </div>
            `).join('');
            
            fullFeedbackHTML += `
                <div class="pattern-analysis-section">
                    <h4 style="margin: 2rem 0 1rem 0; color: #ff6b35;">⚡ Patrones Detectados:</h4>
                    ${patternHTML}
                </div>
            `;
        }
    }
    
    // Botones de acción
    fullFeedbackHTML += `
        <div class="action-buttons" style="margin-top: 2rem; text-align: center;">
            <button class="btn-success" onclick="finishManual()" style="margin-right: 1rem;">
                ✅ Finalizar Manual
            </button>
            <button class="btn-secondary" onclick="restartManual()" style="margin-right: 1rem;">
                🔄 Repetir Evaluación
            </button>
            <button class="btn-secondary" onclick="window.print()">
                🖨️ Imprimir Resultados
            </button>
        </div>
    `;
    
    try {
        container.innerHTML = fullFeedbackHTML;
        console.log('Retroalimentación generada exitosamente');
    } catch (error) {
        console.error('Error insertando HTML de retroalimentación:', error);
        container.innerHTML = `
            <div class="recommendation-card needs-work">
                <h4>📊 Evaluación Completada</h4>
                <p>Has completado la evaluación. Obtuviste ${results.totalScore} de ${results.totalQuestions} respuestas correctas (${results.overallPercentage.toFixed(0)}%).</p>
                <div class="action-buttons" style="margin-top: 1rem;">
                    <button class="btn-success" onclick="finishManual()">✅ Finalizar Manual</button>
                    <button class="btn-secondary" onclick="restartManual()" style="margin-left: 1rem;">🔄 Repetir Evaluación</button>
                </div>
            </div>
        `;
    }
}

function generateAnswerSpecificRecommendations() {
    const recommendations = [];
    
    // Analizar cada respuesta del quiz para dar recomendaciones ultra-específicas
    finalQuizQuestions.forEach((question, index) => {
        const userAnswer = userData.answers[`quiz_${index}`];
        const correctAnswer = question.correct;
        
        if (userAnswer !== correctAnswer && userAnswer !== undefined) {
            // El usuario se equivocó - generar recomendación específica
            const wrongOption = question.options[userAnswer];
            const correctOption = question.options[correctAnswer];
            
            let recommendation = analyzeWrongAnswer(question, userAnswer, correctAnswer, index);
            if (recommendation) {
                recommendations.push(recommendation);
            }
        }
    });
    
    return recommendations;
}

function analyzeWrongAnswer(question, userAnswer, correctAnswer, questionIndex) {
    const wrongOption = question.options[userAnswer];
    const correctOption = question.options[correctAnswer];
    
    // Análisis específico por pregunta
    switch (questionIndex) {
        case 0: // Pregunta sobre tres pilares de vinculación
            if (userAnswer === 1) { // Promoción, Prevención, Especialización
                return {
                    type: 'specific-error',
                    title: '🎯 Confusión sobre Pilares de Vinculación',
                    content: `Respondiste "${wrongOption}" pero los pilares son Comportamientos, Emociones y Afectos, y Cogniciones. "Promoción, Prevención, Especialización" corresponde a los niveles del modelo multinivel.`,
                    action: 'Repasa la sección "El Corazón del Programa: La Vinculación Escolar" y haz clic en cada pilar para ver sus definiciones específicas.'
                };
            } else if (userAnswer === 2) { // Estudiantes, Profesores, Familias
                return {
                    type: 'specific-error',
                    title: '🎯 Error Conceptual en Vinculación',
                    content: `Elegiste "${wrongOption}" que son actores del sistema, pero los pilares de la vinculación son dimensiones internas del estudiante: Comportamientos, Emociones y Afectos, y Cogniciones.`,
                    action: 'Revisa cómo la vinculación se manifiesta desde la perspectiva del estudiante, no desde los actores externos.'
                };
            }
            break;
            
        case 1: // Pregunta sobre vinculación como "energía en acción"
            if (userAnswer === 0) { // Método de evaluación académica
                return {
                    type: 'specific-error',
                    title: '🔍 Malentendido sobre Naturaleza de la Vinculación',
                    content: `La vinculación no es "${wrongOption}". Es la "energía en acción" que conecta emocionalmente al estudiante con su vida escolar, actuando como antídoto contra el abandono.`,
                    action: 'Reflexiona: ¿cómo se siente un estudiante vinculado vs. uno desvinculado? La clave está en la conexión emocional.'
                };
            }
            break;
            
        case 2: // Pregunta sobre porcentajes del modelo multinivel
            if (userAnswer === 0) { // 20-30% para Nivel I
                return {
                    type: 'specific-error',
                    title: '📊 Error Crítico en Modelo Multinivel',
                    content: `Confundiste los porcentajes. El Nivel I cubre al 100% de estudiantes (promocional), no 20-30%. Este porcentaje corresponde al Nivel II (preventivo).`,
                    action: 'MEMORIZA: Nivel I = 100% (todos), Nivel II = 20-30% (algunos), Nivel III = 3-12% (pocos). Es fundamental para planificar intervenciones.'
                };
            } else if (userAnswer === 1) { // 3-12% para Nivel I
                return {
                    type: 'specific-error',
                    title: '📊 Inversión de Porcentajes del Modelo',
                    content: `Invertiste la lógica: 3-12% corresponde al Nivel III (especializado), no al Nivel I. El Nivel I es promocional para el 100% de estudiantes.`,
                    action: 'Visualiza una pirámide invertida: base ancha (100%) = promocional, medio (20-30%) = preventivo, punta (3-12%) = especializado.'
                };
            }
            break;
            
        case 4: // Pregunta sobre ámbitos del sistema de detección
            if (userAnswer === 1) { // Rendimiento, Asistencia, Conducta
                return {
                    type: 'specific-error',
                    title: '🛠️ Confusión en Ámbitos de Detección',
                    content: `"${wrongOption}" son indicadores específicos, pero los tres ámbitos son: Desarrollo Psicosocial (PSC-Y-17), Compromiso Escolar (SEI), y Trayectoria Educativa (SIGE).`,
                    action: 'Cada ámbito tiene su instrumento específico. Estudia qué mide exactamente cada uno y cómo se complementan.'
                };
            }
            break;
            
        case 5: // Pregunta sobre PSC-Y-17
            if (userAnswer === 0) { // 15 ítems, punto de corte ≥ 12
                return {
                    type: 'specific-error',
                    title: '📋 Error en Especificaciones del PSC-Y-17',
                    content: `El PSC-Y-17 tiene exactamente 17 ítems (no 15) y el punto de corte es ≥ 15 (no ≥ 12). Estos números son críticos para la detección correcta.`,
                    action: 'MEMORIZA: PSC-Y-17 = 17 ítems, punto de corte ≥ 15. Un error aquí significa mal diagnóstico de estudiantes.'
                };
            }
            break;
            
        case 6: // Pregunta sobre intervención para riesgo alto en Compromiso Escolar
            if (userAnswer === 0) { // Taller Preventivo
                return {
                    type: 'specific-error',
                    title: '🎯 Error en Asignación de Intervenciones',
                    content: `Para riesgo ALTO en Compromiso Escolar se requiere Mentoría (Nivel III), no "${wrongOption}" que es para riesgo medio (Nivel II).`,
                    action: 'Riesgo ALTO = intervención individual intensiva (Mentoría). Riesgo MEDIO = intervención grupal (Taller Preventivo).'
                };
            }
            break;
            
        case 7: // Pregunta sobre intervención para riesgo medio en Trayectoria Educativa
            if (userAnswer === 1) { // Plan Individual de Reforzamiento
                return {
                    type: 'specific-error',
                    title: '📚 Confusión en Niveles de Intervención Académica',
                    content: `Para riesgo MEDIO en Trayectoria Educativa corresponde "Reforzamiento de Contenidos y Habilidades" (grupal), no "${wrongOption}" que es para riesgo alto (individual).`,
                    action: 'MEDIO = grupal (Nivel II), ALTO = individual (Nivel III). La intensidad de la intervención debe coincidir con el nivel de riesgo.'
                };
            }
            break;
            
        case 8: // Pregunta sobre años de implementación HPV III
            return {
                type: 'specific-error',
                title: '📅 Error en Historia del Programa',
                content: `HPV III tiene 27 años de implementación continua desde 1998, no ${question.options[userAnswer]}. Esta experiencia probada es clave para entender su consolidación.`,
                action: 'Recuerda: 1998-2025 = 27 años. Esta trayectoria da solidez y credibilidad al programa ante directivos y familias.'
            };
            
        case 9: // Pregunta sobre implementación 2025
            if (userAnswer === 0) { // Programa piloto experimental
                return {
                    type: 'specific-error',
                    title: '🚀 Malentendido sobre Madurez del Programa',
                    content: `HPV III NO es un programa piloto experimental. Es un modelo consolidado con 27 años de experiencia y enfoque basado en evidencia.`,
                    action: 'Enfatiza ante equipos directivos que HPV III es un programa maduro y probado, no experimental.'
                };
            }
            break;
    }
    
    return null; // No hay recomendación específica para esta respuesta
}

function analyzeErrorPatterns() {
    const recommendations = [];
    const wrongAnswers = [];
    
    // Recopilar todas las respuestas incorrectas
    finalQuizQuestions.forEach((question, index) => {
        const userAnswer = userData.answers[`quiz_${index}`];
        const correctAnswer = question.correct;
        
        if (userAnswer !== correctAnswer && userAnswer !== undefined) {
            wrongAnswers.push({
                questionIndex: index,
                area: question.area,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer
            });
        }
    });
    
    // Analizar patrones específicos
    const errorsByArea = wrongAnswers.reduce((acc, error) => {
        if (!acc[error.area]) acc[error.area] = [];
        acc[error.area].push(error);
        return acc;
    }, {});
    
    // Patrón: Confusión entre niveles del modelo multinivel
    const modelErrors = wrongAnswers.filter(e => [2, 3].includes(e.questionIndex));
    if (modelErrors.length >= 1) {
        recommendations.push({
            type: 'pattern-error',
            title: '🔄 Patrón Detectado: Confusión en Modelo Multinivel',
            content: 'Tienes dificultades con los porcentajes y objetivos del modelo multinivel. Este es un error crítico porque determina cómo planificar las intervenciones.',
            action: 'Crea una tabla mental: Nivel I (100%, promocional), Nivel II (20-30%, preventivo grupal), Nivel III (3-12%, especializado individual). Practica con casos reales.'
        });
    }
    
    // Patrón: Problemas con instrumentos de detección
    const detectionErrors = wrongAnswers.filter(e => [4, 5].includes(e.questionIndex));
    if (detectionErrors.length >= 1) {
        recommendations.push({
            type: 'pattern-error',
            title: '🔍 Patrón Detectado: Problemas con Sistema de Detección',
            content: 'Muestras confusión sobre los instrumentos de detección. Esto es fundamental porque determina qué estudiantes necesitan qué tipo de apoyo.',
            action: 'Memoriza la tríada: PSC-Y-17 (psicosocial), SEI (compromiso escolar), SIGE (trayectoria educativa). Cada uno detecta un tipo diferente de riesgo.'
        });
    }
    
    // Patrón: Confusión entre intervenciones por nivel de riesgo
    const interventionErrors = wrongAnswers.filter(e => [6, 7].includes(e.questionIndex));
    if (interventionErrors.length >= 1) {
        recommendations.push({
            type: 'pattern-error',
            title: '⚡ Patrón Detectado: Asignación Incorrecta de Intervenciones',
            content: 'Confundes qué intervención corresponde a cada nivel de riesgo. Esto podría resultar en subutilización o sobreintervención de estudiantes.',
            action: 'Regla de oro: Riesgo MEDIO = intervención GRUPAL (Nivel II), Riesgo ALTO = intervención INDIVIDUAL (Nivel III). La intensidad debe coincidir.'
        });
    }
    
    // Patrón: Problemas conceptuales con vinculación escolar
    const vinculacionErrors = wrongAnswers.filter(e => [0, 1].includes(e.questionIndex));
    if (vinculacionErrors.length >= 1) {
        recommendations.push({
            type: 'pattern-error',
            title: '❤️ Patrón Detectado: Malentendido sobre Vinculación Escolar',
            content: 'No tienes clara la esencia de la vinculación escolar, que es el corazón conceptual de HPV III. Sin esto, las intervenciones pierden sentido.',
            action: 'La vinculación es emocional, no administrativa. Es cómo se SIENTE el estudiante respecto a su escuela: conectado vs. desconectado. Reflexiona sobre tu propia experiencia escolar.'
        });
    }
    
    // Patrón: Múltiples errores en una misma área
    Object.keys(errorsByArea).forEach(area => {
        const errors = errorsByArea[area];
        if (errors.length >= 2) {
            const areaNames = {
                'vinculacion': 'Vinculación Escolar',
                'modelo': 'Modelo Multinivel',
                'deteccion': 'Sistema de Detección',
                'acciones': 'Acciones del Programa',
                'rol': 'Fundamentos del Programa'
            };
            
            recommendations.push({
                type: 'area-weakness',
                title: `📍 Debilidad Crítica Identificada: ${areaNames[area]}`,
                content: `Tienes múltiples errores en ${areaNames[area]}. Esta área requiere estudio intensivo antes de implementar HPV III.`,
                action: `PRIORIDAD ALTA: Dedica tiempo específico a estudiar ${areaNames[area]}. Considera solicitar capacitación adicional en esta área específica.`
            });
        }
    });
    
    return recommendations;
}

function showFeedbackInterface(results) {
    // Mostrar interfaz de retroalimentación
    const container = document.getElementById('quizResults');
    const scoreDisplay = document.getElementById('finalScore');
    
    if (scoreDisplay) scoreDisplay.textContent = `${results.totalScore}`;
    
    // Generar recomendaciones de evaluación
    generateEvaluationRecommendations(results);
}

function exportarProgreso() {
    try {
        const data = JSON.stringify(userData, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'progreso_hpv3.json';
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Progreso exportado', 'success');
    } catch (error) {
        // Error silencioso para producción
    }
}

function limpiarProgreso() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el manual?')) {
        restartManual();
    }
}

function toggleHelp() {
    try {
        const helpContent = document.getElementById('helpContent');
        if (helpContent) {
            helpContent.style.display = helpContent.style.display === 'block' ? 'none' : 'block';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

// ===== FUNCIONES DEL QUIZ =====

function createFinalQuiz() {
    try {
        const container = document.getElementById('quizContainer');
        if (!container) {
            return;
        }
        
        container.innerHTML = `
            <div class="quiz-question" id="quizQuestion">
                <!-- Preguntas se cargarán aquí -->
            </div>
        `;
        
        currentQuizQuestion = 0;
        quizAnswers = [];
        showQuizQuestion(0);
    } catch (error) {
        // Error silencioso para producción
    }
}

function showQuizQuestion(index) {
    try {
        const question = finalQuizQuestions[index];
        const questionContainer = document.getElementById('quizQuestion');
        const counter = document.getElementById('quizProgressText');
        const progressBar = document.getElementById('quizProgress');
        
        if (!questionContainer || !question) return;
        
        if (counter) {
            counter.textContent = `Pregunta ${index + 1} de ${finalQuizQuestions.length}`;
        }
        const progress = ((index + 1) / finalQuizQuestions.length) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        questionContainer.innerHTML = `
            <div class="question-content">
                <h3>Pregunta ${index + 1}</h3>
                <p class="question-text">${question.question}</p>
                <div class="options-container">
                    ${question.options.map((option, optionIndex) => `
                        <label class="option-label">
                            <input type="radio" name="quizAnswer" value="${optionIndex}"
                                   ${quizAnswers[index] === optionIndex ? 'checked' : ''}>
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        
        const prevBtn = document.getElementById('prevQuizBtn');
        const nextBtn = document.getElementById('nextQuizBtn');
        let finishBtn = document.getElementById('finishQuizBtn');
        
        if (prevBtn) prevBtn.disabled = (index === 0);
        
        if (index === finalQuizQuestions.length - 1) {
            if (!finishBtn) {
                const quizNavigation = document.querySelector('.quiz-navigation');
                if (quizNavigation) {
                    finishBtn = document.createElement('button');
                    finishBtn.id = 'finishQuizBtn';
                    finishBtn.className = 'btn-success hpv-hover-lift hpv-click-bounce';
                    finishBtn.textContent = 'Finalizar Quiz';
                    finishBtn.onclick = finishQuiz;
                    quizNavigation.appendChild(finishBtn);
                }
            }
            
            if (nextBtn) nextBtn.style.display = 'none';
            if (finishBtn) finishBtn.style.display = 'inline-block';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-block';
            if (finishBtn) finishBtn.style.display = 'none';
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function nextQuizQuestion() {
    try {
        saveCurrentAnswer();
        if (currentQuizQuestion < finalQuizQuestions.length - 1) {
            currentQuizQuestion++;
            showQuizQuestion(currentQuizQuestion);
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function previousQuizQuestion() {
    try {
        if (currentQuizQuestion > 0) {
            saveCurrentAnswer();
            currentQuizQuestion--;
            showQuizQuestion(currentQuizQuestion);
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function saveCurrentAnswer() {
    try {
        const selectedOption = document.querySelector('input[name="quizAnswer"]:checked');
        if (selectedOption) {
            quizAnswers[currentQuizQuestion] = parseInt(selectedOption.value);
            userData.answers[`quiz_${currentQuizQuestion}`] = parseInt(selectedOption.value);
        }
    } catch (error) {
        // Error silencioso para producción
    }
}

function finishQuiz() {
    try {
        saveCurrentAnswer();
        
        const unansweredQuestions = [];
        for (let i = 0; i < finalQuizQuestions.length; i++) {
            if (quizAnswers[i] === undefined) {
                unansweredQuestions.push(i + 1);
            }
        }
        
        if (unansweredQuestions.length > 0) {
            alert(`Por favor responde todas las preguntas. Faltan las preguntas: ${unansweredQuestions.join(', ')}`);
            return;
        }
        
        userData.sessionInfo.completionDate = new Date().toISOString();
        
        // Marcar progreso como 100% al completar quiz
        userData.progress = 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        if (progressFill && progressText) {
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            progressFill.classList.add('completed');
        }
        
        const results = generateFeedback();
        showFeedbackInterface(results);
        
        const quizQuestion = document.querySelector('.quiz-question');
        const quizNavigation = document.querySelector('.quiz-navigation');
        const quizResults = document.getElementById('quizResults');
        
        if (quizQuestion) quizQuestion.style.display = 'none';
        if (quizNavigation) quizNavigation.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';
        
        if (quizResults) quizResults.scrollIntoView({ behavior: 'smooth' });
        
        showNotification('Quiz completado exitosamente', 'success');
        
    } catch (error) {
        // Error silencioso para producción
    }
}

// ===== FUNCIONES DRAG AND DROP =====

function initializeDragAndDrop() {
    const caseCards = document.querySelectorAll('.case-card[draggable="true"]');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    caseCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragenter', handleDragEnter);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedElement !== null) {
        const correctAnswer = draggedElement.getAttribute('data-answer');
        const dropLevel = this.getAttribute('data-level');
        
        const droppedCard = draggedElement.cloneNode(true);
        droppedCard.draggable = false;
        droppedCard.classList.remove('dragging', 'can-drag-again');
        droppedCard.classList.add('dropped-card');
        
        if (correctAnswer === dropLevel) {
            droppedCard.classList.add('correct');
            showNotification('¡Correcto!', 'success');
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.className = 'remove-card-btn';
            removeBtn.onclick = function() {
                returnCardToOriginalPosition(correctAnswer);
                droppedCard.remove();
            };
            droppedCard.appendChild(removeBtn);
        } else {
            droppedCard.classList.add('incorrect');
            
            const hint = getHintForWrongPlacement(correctAnswer, dropLevel);
            showNotification(`Incorrecto. ${hint}`, 'warning');
            
            droppedCard.draggable = true;
            droppedCard.classList.add('can-drag-again');
            
            droppedCard.addEventListener('dragstart', handleDragStart);
            droppedCard.addEventListener('dragend', handleDragEnd);
            
            const retryBtn = document.createElement('button');
            retryBtn.innerHTML = '🔄 Intentar de nuevo';
            retryBtn.className = 'retry-btn';
            retryBtn.onclick = function() {
                returnCardToOriginalPosition(correctAnswer);
                droppedCard.remove();
            };
            droppedCard.appendChild(retryBtn);
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.className = 'remove-card-btn';
            removeBtn.onclick = function() {
                returnCardToOriginalPosition(correctAnswer);
                droppedCard.remove();
            };
            droppedCard.appendChild(removeBtn);
        }
        
        const existingCards = this.querySelectorAll('.dropped-card');
        existingCards.forEach(card => card.remove());
        
        this.appendChild(droppedCard);
        
        draggedElement.style.display = 'none';
        
        checkDragDropCompletion();
    }
    
    return false;
}

function checkDragDropCompletion() {
    const correctPlacements = document.querySelectorAll('.dropped-card.correct').length;
    const totalCards = document.querySelectorAll('.case-card').length;
    
    if (correctPlacements === totalCards) {
        showNotification('¡Excelente! Has completado el ejercicio correctamente', 'success');
        userData.completedActivities.push('modelo-drag-drop');
    }
}

function getHintForWrongPlacement(correctAnswer, droppedLevel) {
    const hints = {
        '1': {
            '2': 'Este caso es para TODA la comunidad (Nivel I), no solo para algunos estudiantes.',
            '3': 'Este caso es promocional para TODOS, no requiere apoyo especializado.'
        },
        '2': {
            '1': 'Este caso necesita intervención específica (Nivel II), no solo promoción general.',
            '3': 'Este caso requiere apoyo grupal (Nivel II), no individual especializado.'
        },
        '3': {
            '1': 'Este caso es muy grave para solo promoción general, necesita apoyo especializado.',
            '2': 'Este caso requiere apoyo individual (Nivel III), no grupal.'
        }
    };
    
    return hints[correctAnswer]?.[droppedLevel] || 'Piensa en la intensidad del apoyo que necesita este caso.';
}

function returnCardToOriginalPosition(cardAnswer) {
    const originalCard = document.querySelector(`.cases-pool .case-card[data-answer="${cardAnswer}"]`);
    if (originalCard) {
        originalCard.style.display = 'block';
        originalCard.classList.remove('dragging');
    }
}

function resetDragDropExercise() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        const droppedCards = zone.querySelectorAll('.dropped-card');
        droppedCards.forEach(card => card.remove());
        zone.classList.remove('drag-over');
    });
    
    const caseCards = document.querySelectorAll('.case-card[draggable="true"]');
    caseCards.forEach(card => {
        card.style.display = 'block';
        card.classList.remove('dragging');
    });
    
    showNotification('Ejercicio reiniciado', 'info');
}

// ===== INICIALIZACIÓN =====
function initialize() {
    if (initialized) {
        return;
    }
    
    try {
        initialized = true;
        
        setupNavigation();
        showSection('intro');
        
        userData.sessionInfo.startDate = new Date().toISOString();
        
        // Inicializar indicador de progreso
        updateProgressIndicator();
        
        initializeDragAndDrop();
        
    } catch (error) {
        // Error silencioso para producción
        initialized = false;
    }
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', initialize);

// ===== EXPONER FUNCIONES GLOBALES =====
window.showSection = showSection;
window.saveReflection = saveReflection;
window.nextSection = nextSection;
window.prevSection = prevSection;
window.togglePillar = togglePillar;
window.toggleLevel = toggleLevel;
window.toggleDetection = toggleDetection;
window.toggleAccordion = toggleAccordion;
window.checkAnswer = checkAnswer;
window.evaluateRisk = evaluateRisk;
window.loadCase = loadCase;
window.validatePlan = validatePlan;
window.finishManual = finishManual;
window.restartManual = restartManual;
window.saveSelfcarePlan = saveSelfcarePlan;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleFullscreen = toggleFullscreen;
window.exportarProgreso = exportarProgreso;
window.limpiarProgreso = limpiarProgreso;
window.toggleHelp = toggleHelp;
window.nextQuizQuestion = nextQuizQuestion;
window.previousQuizQuestion = previousQuizQuestion;
window.finishQuiz = finishQuiz;
window.createFinalQuiz = createFinalQuiz;
window.resetDragDropExercise = resetDragDropExercise;