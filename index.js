const getQuoteBtn = document.querySelector(".get-quote-btn"),
quoteText = document.querySelector(".quote-text"),
authorName = document.querySelector(".author-name"),
speakBtn = document.querySelector(".speak-btn"),
copyBtn = document.querySelector(".copy-btn"), 
copyToast = document.querySelector(".copy-toast")


// Fetches quote onload and when the fetch button is clicked
const fetchQuote = async () => {
    getQuoteBtn.textContent = "Loading...."
    getQuoteBtn.classList.add("loading")

    const quoteJson = await fetch("https://api.realinspire.live/v1/quotes/random")
    const quoteData = await quoteJson.json()

    quoteText.textContent = quoteData[0].content
    authorName.textContent = quoteData[0].author

    getQuoteBtn.classList.remove("loading")
    getQuoteBtn.textContent = "New Quote"
}

fetchQuote()

// Event listeners

getQuoteBtn.addEventListener("click", () => {
    fetchQuote()
})

speakBtn.addEventListener("click", () => {
    // utters quote
    let speak  = new SpeechSynthesisUtterance(`${quoteText.textContent} by ${authorName.textContent}`)
    speechSynthesis.speak(speak)

})

copyBtn.addEventListener("click", () => {
    // copies quote to clipboard
    navigator.clipboard.writeText(quoteText.textContent)
    copyToast.classList.remove("hidden")
    setTimeout(() => copyToast.classList.add("hidden"), 1000)
})

