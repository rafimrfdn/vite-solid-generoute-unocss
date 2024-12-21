import { createSignal, Show, For } from "solid-js";
import { quizData } from "./categorizedquiz"; // Import JSON data

export default function QuizCat(props) {
  // Filter questions by category
  const categoryQuestions = quizData.filter(
    (question) => question.category === props.category
  );

  // State to track the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);

  // State to store user's answers
  const [userAnswers, setUserAnswers] = createSignal([]);

  // State to track if the quiz is completed
  const [isQuizCompleted, setIsQuizCompleted] = createSignal(false);

  // Handle option selection
  function handleOptionSelect(option) {
    const answers = [...userAnswers()];
    answers[currentQuestionIndex()] = option; // Store the answer for the current question
    setUserAnswers(answers);
  }

  // Move to the next question
  function handleNext() {
    if (currentQuestionIndex() < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex() + 1);
    } else {
      setIsQuizCompleted(true); // Mark the quiz as completed
    }
  }

  // Calculate score
  const calculateScore = () => {
    return userAnswers().filter(
      (answer, index) => answer === categoryQuestions[index].answer
    ).length;
  };

  return (
    <div>
      <h1>Quiz App - {props.category}</h1>
      <Show
        when={!isQuizCompleted()}
        fallback={
          <div>
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: {calculateScore()} / {categoryQuestions.length}
            </p>
          </div>
        }
      >
        <div>
          <h2>
            Question {currentQuestionIndex() + 1} of {categoryQuestions.length}
          </h2>
          <p>{categoryQuestions[currentQuestionIndex()].question}</p>
          <div>
            <For each={categoryQuestions[currentQuestionIndex()].options}>
              {(option) => (
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex()}`}
                      value={option}
                      checked={
                        userAnswers()[currentQuestionIndex()] === option
                      }
                      onChange={() => handleOptionSelect(option)}
                    />
                    {option}
                  </label>
                </div>
              )}
            </For>
          </div>
          <button
            onClick={handleNext}
            disabled={!userAnswers()[currentQuestionIndex()]} // Disable if no answer is selected
          >
            {currentQuestionIndex() === categoryQuestions.length - 1
              ? "Finish Quiz"
              : "Next"}
          </button>
        </div>
      </Show>
    </div>
  );
}
