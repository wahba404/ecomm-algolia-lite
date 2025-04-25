import { useEffect } from "react";

export default function useAnimatedPlaceholder(
  selector,
  placeholders,
  delayAfterAnimation = 1000,
  typingDelay = 90,
) {
  function setPlaceholder(inputNode, text) {
    inputNode.setAttribute("placeholder", text);
  }

  async function animateOnePlaceholder(inputNode, text) {
    const letters = text.split("");
    let currentString = [];

    for (const letter of letters) {
      currentString.push(letter);
      setPlaceholder(inputNode, currentString.join(""));
      await new Promise((resolve) => setTimeout(resolve, typingDelay));
    }
  }

  async function animateAllPlaceholders(inputNode) {
    while (true) {
      for (let i = 0; i < placeholders.length; i++) {
        await animateOnePlaceholder(inputNode, placeholders[i]);
        await new Promise((resolve) =>
          setTimeout(resolve, delayAfterAnimation),
        );
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const inputNode = document.querySelector(selector);
      if (inputNode) {
        animateAllPlaceholders(inputNode);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selector, placeholders, delayAfterAnimation, typingDelay]);
}
