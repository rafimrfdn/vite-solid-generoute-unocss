import { createSignal, createResource, Show, For } from "solid-js";

// Fetching data from JSON file
const fetchQuizData = async () => {
  const response = await fetch("./quizdata.json"); // Ensure this file exists in the `public` folder
  if (!response.ok) throw new Error("Failed to fetch quiz data");
  return response.json();
};

// Resource to load the quiz data
const [quizData] = createResource(fetchQuizData);

export default function QuizApp() {
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
    if (currentQuestionIndex() < quizData()?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex() + 1);
    } else {
      setIsQuizCompleted(true); // Mark the quiz as completed
    }
  }

  // Calculate score
  const calculateScore = () => {
    return userAnswers().filter(
      (answer, index) => answer === quizData()?.[index]?.answer
    ).length;
  };

  return (
    <div>
      <h1>Multiple Choice Quiz App</h1>

      <Show
        when={quizData()}
        fallback={<p>Loading quiz data...</p>} // Fallback state while the data is loading
      >
        <Show
          when={!isQuizCompleted()}
          fallback={
            <div>
              <h2>Quiz Completed!</h2>
              <p>Your Score: {calculateScore()} / {quizData().length}</p>
            </div>
          }
        >
          <div>
            <h2>
              Question {currentQuestionIndex() + 1} of {quizData().length}
            </h2>
            <p>{quizData()[currentQuestionIndex()].question}</p>
            <div>
              <For each={quizData()[currentQuestionIndex()].options}>
                {(option) => (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex()}`}
                        value={option}
                        checked={userAnswers()[currentQuestionIndex()] === option}
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
              {currentQuestionIndex() === quizData().length - 1
                ? "Finish Quiz"
                : "Next"}
            </button>
          </div>
        </Show>
      </Show>
    </div>
  );
}
