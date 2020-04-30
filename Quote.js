import React, { useState, useEffect } from "react";
import "./Quote.css";

function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [currQuote, setCurrQuote] = useState(null);
  const [currAuthor, setCurrAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((response) => {
        const random = Math.floor(Math.random() * 102);
        setQuotes(response.quotes.map((item) => item));
        setCurrQuote(response.quotes[random].quote);
        setCurrAuthor(response.quotes[random].author);
        setIsLoading(false);
      });
  }, []);

  function changeQuote() {
    const random = Math.floor(Math.random() * 102);
    setCurrQuote(quotes[random].quote);
    setCurrAuthor(quotes[random].author);
  }

  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div id="bg">
          <div id="quote-box">
            <h2 id="text">"{currQuote}"</h2>
            <h3 id="author">- {currAuthor}</h3>
            <button id="new-quote" onClick={changeQuote}>
              New quote
            </button>
            <a href="twitter.com/intent/tweet">
              <button id="tweet-quote">Tweet quote</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quote;
