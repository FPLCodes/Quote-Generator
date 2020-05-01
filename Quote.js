import React, { useState, useEffect } from "react";
import { TwitterShareButton } from "react-twitter-embed";
import { randomColor } from "randomcolor";
import "./Quote.css";

function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [currQuote, setCurrQuote] = useState(null);
  const [currAuthor, setCurrAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bg, setBg] = useState("");

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
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
        setBg(randomColor());
      });
  }, []);

  function changeQuote() {
    const random = Math.floor(Math.random() * 102);
    setCurrQuote(quotes[random].quote);
    setCurrAuthor(quotes[random].author);

    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBg(color);
  }

  return (
    <div>
      {isLoading ? (
        <div id="bg-load">
          <div id="circle" className="circle1"></div>
          <div id="circle" className="circle2"></div>
          <div id="circle" className="circle3"></div>
        </div>
      ) : (
        <div id="bg" style={{ backgroundColor: bg }}>
          <div id="quote-box" style={{ color: bg }}>
            <h2 id="text">"{currQuote}"</h2>
            <h3 id="author">- {currAuthor}</h3>
            <button id="new-quote" onClick={changeQuote}>
              New quote
            </button>
            <div id="tweet-quote">
              <TwitterShareButton
                options={{ text: `"${currQuote}" -${currAuthor}` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quote;
