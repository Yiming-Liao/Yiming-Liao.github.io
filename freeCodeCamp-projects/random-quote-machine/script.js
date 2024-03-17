let text = document.getElementById('text');
let author = document.getElementById('author');
let button = document.getElementById('new-quote');
let tweet = document.getElementById('tweet-quote');

let main = document.getElementById('main');
let icon = document.getElementById('icon');


const quotes = [
    { quote: 'The unexamined life is not worth living.', author: '― Socrates' },
    { quote: 'Be the change that you wish to see in the world.', author: '― Mahatma Gandhi' },
    { quote: 'Without music, life would be a mistake.', author: '― Friedrich Nietzsche' },
    { quote: 'Without deviation from the norm, progress is not possible.', author: '― Frank Zappa' },
    { quote: "A truth that's told with bad intent Beats all the lies you can invent.", author: '― William Blake' },
    { quote: "Those who know do not speak. Those who speak do not know.", author: '― Lao Tsu' },
    { quote: "The price good men pay for indifference to public affairs is to be ruled by evil men.", author: '― Plato' },
    { quote: "Music is ... A higher revelation than all Wisdom & Philosophy", author: '― Ludwig van Beethoven' },
    { quote: "The easy confidence with which I know another man's religion is folly teaches me to suspect that my own is also.", author: '― Mark Twain' },
    { quote: "Life is really simple, but we insist on making it complicated.", author: '― Confucius' },
]

let quotesIndex = 0;

text.classList.add('fade-in')
author.classList.add('fade-in')

const changeText = () => {
    quotesIndex = (quotesIndex + 1) % quotes.length;
    text.classList.replace("fade-in", "fade-out");
    author.classList.replace("fade-in", "fade-out");
    setTimeout(() => {

        changeColor();
        text.classList.replace("fade-out", "fade-in");
        author.classList.replace("fade-out", "fade-in");
        text.innerText = quotes[quotesIndex].quote;
        author.innerText = quotes[quotesIndex].author;
    }, 250);
}

tweet.addEventListener('click', () => {
    tweet.href = `https://twitter.com/intent/tweet?text=${quotes[quotesIndex].quote}+++++${quotes[quotesIndex].author}`;
})

const colors = ['#f8b595', '#f67280', '#c06c84', '#6c5b7c', '#c7b198', '#596e79']
let colorIndex = 0;
const changeColor = () => {
    colorIndex = (colorIndex + 1) % colors.length;

    text.style.color = colors[colorIndex];
    author.style.color = colors[colorIndex];
    main.style.backgroundColor = colors[colorIndex];
    button.style.backgroundColor = colors[colorIndex];
    icon.style.color = colors[colorIndex];
}

changeColor();
changeText();
button.addEventListener('click', changeText)
