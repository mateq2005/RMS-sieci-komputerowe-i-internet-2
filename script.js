// ===========================
// QUIZ APPLICATION LOGIC
// ===========================

class QuizApp {
    constructor() {
        this.questions = [];
        this.activeQuestions = [];
        this.currentQuestion = null;
        this.currentQuestionIndex = 0;
        this.correctAnswersCount = 0;
        this.totalQuestionsCount = 0;
        this.answered = false;
        this.selectedAnswers = [];
        
        this.initializeDOM();
        this.attachEventListeners();
        this.loadQuestions();
    }

    // ===========================
    // INITIALIZATION
    // ===========================

    initializeDOM() {
        // States
        this.loadingState = document.getElementById('loadingState');
        this.quizState = document.getElementById('quizState');
        this.completionState = document.getElementById('completionState');
        this.errorState = document.getElementById('errorState');

        // Quiz Elements
        this.questionText = document.getElementById('questionText');
        this.answersContainer = document.getElementById('answersContainer');
        this.questionNumber = document.getElementById('questionNumber');
        this.progressText = document.getElementById('progressText');
        this.progressFill = document.getElementById('progressFill');
        this.feedbackMessage = document.getElementById('feedbackMessage');
        this.feedbackText = document.getElementById('feedbackText');

        // Buttons
        this.submitBtn = document.getElementById('submitBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.skipBtn = document.getElementById('skipBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.retryBtn = document.getElementById('retryBtn');

        // Error
        this.errorMessage = document.getElementById('errorMessage');
    }

    attachEventListeners() {
        this.submitBtn.addEventListener('click', () => this.submitAnswer());
        this.nextBtn.addEventListener('click', () => this.loadNextQuestion());
        this.skipBtn.addEventListener('click', () => this.skipQuestion());
        this.restartBtn.addEventListener('click', () => this.restart());
        this.retryBtn.addEventListener('click', () => this.loadQuestions());
    }

    // ===========================
    // LOADING & INITIALIZATION
    // ===========================

    async loadQuestions() {
        try {
            this.showState('loading');
            
            // Fetch questions from JSON file
            const response = await fetch('pytania.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.questions = await response.json();
            
            // Validate data structure
            if (!Array.isArray(this.questions) || this.questions.length === 0) {
                throw new Error('Invalid JSON format or empty questions array');
            }
            
            // Validate each question has required fields
            this.questions.forEach((q, index) => {
                if (!q.pytanie || !q.odpowiedzi || !q.poprawne_odpowiedzi) {
                    throw new Error(`Question ${index + 1} is missing required fields`);
                }
                if (!Array.isArray(q.odpowiedzi) || !Array.isArray(q.poprawne_odpowiedzi)) {
                    throw new Error(`Question ${index + 1} has invalid structure`);
                }
            });
            
            // Initialize quiz
            this.initializeQuiz();
            
        } catch (error) {
            console.error('Error loading questions:', error);
            this.showError(error.message);
        }
    }

    initializeQuiz() {
        this.activeQuestions = [...this.questions];
        this.totalQuestionsCount = this.questions.length;
        this.correctAnswersCount = 0;
        this.currentQuestionIndex = 0;
        this.answered = false;
        this.selectedAnswers = [];
        
        this.showState('quiz');
        this.loadNextQuestion();
    }

    // ===========================
    // QUESTION MANAGEMENT
    // ===========================

    loadNextQuestion() {
        if (this.activeQuestions.length === 0) {
            this.showCompletion();
            return;
        }

        // Get random question from active pool
        const randomIndex = Math.floor(Math.random() * this.activeQuestions.length);
        this.currentQuestion = this.activeQuestions[randomIndex];
        this.currentQuestionIndex = randomIndex;

        // Reset UI
        this.answered = false;
        this.selectedAnswers = [];
        this.feedbackMessage.classList.add('hidden');
        this.submitBtn.classList.remove('hidden');
        this.submitBtn.disabled = true;
        this.nextBtn.classList.add('hidden');
        this.answersContainer.innerHTML = '';

        // Render question
        this.renderQuestion();
        this.updateProgressBar();
    }

    skipQuestion() {
        this.loadNextQuestion();
    }

    renderQuestion() {
        // Update question text and number
        this.questionText.textContent = this.currentQuestion.pytanie;
        this.questionNumber.textContent = `${this.totalQuestionsCount - this.activeQuestions.length + 1}`;

        // Determine if multiple answers needed
        const isMultipleChoice = this.currentQuestion.poprawne_odpowiedzi.length > 1;

        // Render answer options
        this.currentQuestion.odpowiedzi.forEach((answer, index) => {
            const answerDiv = document.createElement('label');
            answerDiv.classList.add('answer-option');

            const inputId = `answer_${index}`;
            const inputType = isMultipleChoice ? 'checkbox' : 'radio';

            const input = document.createElement('input');
            input.type = inputType;
            input.id = inputId;
            input.name = isMultipleChoice ? `answer_${index}` : 'answer';
            input.value = answer;
            input.disabled = this.answered;

            input.addEventListener('change', () => {
                this.handleAnswerSelection(isMultipleChoice);
            });

            const labelElement = document.createElement('label');
            labelElement.htmlFor = inputId;
            labelElement.textContent = answer;

            answerDiv.appendChild(input);
            answerDiv.appendChild(labelElement);

            this.answersContainer.appendChild(answerDiv);
        });
    }

    handleAnswerSelection(isMultipleChoice) {
        const inputs = this.answersContainer.querySelectorAll('input');
        const anySelected = Array.from(inputs).some(input => input.checked);
        
        this.submitBtn.disabled = !anySelected;

        if (!isMultipleChoice) {
            // For single choice, auto-submit immediately
            setTimeout(() => {
                this.submitAnswer();
            }, 300);
        }
    }

    // ===========================
    // ANSWER SUBMISSION
    // ===========================

    submitAnswer() {
        if (this.answered) return;

        const inputs = this.answersContainer.querySelectorAll('input:checked');
        const selectedAnswers = Array.from(inputs).map(input => input.value);

        if (selectedAnswers.length === 0) {
            alert('Proszę wybrać odpowiedź');
            return;
        }

        this.selectedAnswers = selectedAnswers;
        this.answered = true;

        // Check if answer is correct
        const isCorrect = this.checkAnswer(selectedAnswers);

        // Disable all inputs
        this.answersContainer.querySelectorAll('input').forEach(input => {
            input.disabled = true;
        });

        // Show feedback
        this.showFeedback(isCorrect);

        // Update UI based on result
        if (isCorrect) {
            this.correctAnswersCount++;
            this.markAnswersAsCorrect(selectedAnswers);
            this.removeQuestionFromPool();
        } else {
            this.markAnswersAsIncorrect(selectedAnswers);
        }

        // Show next button or submit button
        this.submitBtn.classList.add('hidden');
        this.nextBtn.classList.remove('hidden');
    }

    checkAnswer(selectedAnswers) {
        const correctAnswers = this.currentQuestion.poprawne_odpowiedzi;
        
        // Check if arrays are equal (same length and same elements)
        if (selectedAnswers.length !== correctAnswers.length) {
            return false;
        }

        return selectedAnswers.every(answer => 
            correctAnswers.includes(answer)
        );
    }

    markAnswersAsCorrect(selectedAnswers) {
        const options = this.answersContainer.querySelectorAll('.answer-option');
        options.forEach(option => {
            const input = option.querySelector('input');
            if (selectedAnswers.includes(input.value)) {
                option.classList.add('correct');
            }
        });
    }

    markAnswersAsIncorrect(selectedAnswers) {
        const options = this.answersContainer.querySelectorAll('.answer-option');
        const correctAnswers = this.currentQuestion.poprawne_odpowiedzi;

        options.forEach(option => {
            const input = option.querySelector('input');
            
            if (selectedAnswers.includes(input.value)) {
                option.classList.add('incorrect');
            } else if (correctAnswers.includes(input.value)) {
                option.classList.add('correct');
            }
        });
    }

    showFeedback(isCorrect) {
        this.feedbackMessage.classList.remove('hidden');
        this.feedbackMessage.classList.remove('success', 'error');

        if (isCorrect) {
            this.feedbackMessage.classList.add('success');
            this.feedbackText.textContent = '✓ Poprawnie! Odpowiedź została usunięta z puli.';
        } else {
            this.feedbackMessage.classList.add('error');
            const correctAnswers = this.currentQuestion.poprawne_odpowiedzi.join(', ');
            this.feedbackText.textContent = `✗ Błędnie! Poprawna odpowiedź to: ${correctAnswers}`;
        }
    }

    removeQuestionFromPool() {
        this.activeQuestions.splice(this.currentQuestionIndex, 1);
    }

    // ===========================
    // PROGRESS & UI UPDATES
    // ===========================

    updateProgressBar() {
        const totalQuestions = this.totalQuestionsCount;
        const answeredCorrectly = this.correctAnswersCount;
        const progress = (answeredCorrectly / totalQuestions) * 100;

        this.progressFill.style.width = progress + '%';
        this.progressText.textContent = `${answeredCorrectly}/${totalQuestions}`;
    }

    // ===========================
    // COMPLETION SCREEN
    // ===========================

    showCompletion() {
        document.getElementById('totalQuestions').textContent = this.totalQuestionsCount;
        document.getElementById('correctAnswers').textContent = this.correctAnswersCount;
        
        this.showState('completion');
    }

    // ===========================
    // ERROR HANDLING
    // ===========================

    showError(message) {
        this.errorMessage.textContent = message;
        this.showState('error');
    }

    // ===========================
    // STATE MANAGEMENT
    // ===========================

    showState(state) {
        this.loadingState.classList.add('hidden');
        this.quizState.classList.add('hidden');
        this.completionState.classList.add('hidden');
        this.errorState.classList.add('hidden');

        switch (state) {
            case 'loading':
                this.loadingState.classList.remove('hidden');
                break;
            case 'quiz':
                this.quizState.classList.remove('hidden');
                break;
            case 'completion':
                this.completionState.classList.remove('hidden');
                break;
            case 'error':
                this.errorState.classList.remove('hidden');
                break;
        }
    }

    // ===========================
    // RESTART
    // ===========================

    restart() {
        this.initializeQuiz();
    }
}

// ===========================
// APPLICATION INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
