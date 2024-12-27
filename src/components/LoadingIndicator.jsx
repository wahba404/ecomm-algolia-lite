import { useInstantSearch } from "react-instantsearch";

function LoadingIndicator() {
  const { status } = useInstantSearch();

  if (status === "loading" || status === "stalled") {
    return (
      <div className="flex justify-center items-center">
        <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }
  return null;
}
export default LoadingIndicator;
