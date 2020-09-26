let sections = document.querySelectorAll("section");
sections = [].slice.call(sections, 0).reverse();


let ProceedDirectly = () => {
    gsap.to(".rest-1 > h1", { x: 2000, duration: 1 });
    gsap.to(".rest-1 > p:nth-of-type(1)", { x: 2000, duration: 1 });
    gsap.to(".rest-1 > p:nth-of-type(2)", { x: -2000, duration: 1 });
    gsap.to(".rest-1 > button:nth-of-type(1)", { x: -2000, duration: 1 });
    gsap.to(".rest-1 > button:nth-of-type(2)", { x: -2000, duration: 1 });
    setTimeout(() => {
        sections[1].classList.add("show-section");
        sections[0].classList.remove("show-section");
    }, 1000)

}


let text = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, temporibus dolores ipsum quas nam unde neque ducimus";

let favArtist = document.querySelector("#fav-artist");
let ArtistSend = () => {
    //send the artist to the backend
    let loader = document.querySelector(".rest-2 > .loader");
    console.log(loader)
    loader.classList.add("show");
    setTimeout(() => {
        loader.classList.remove("show");
        if (window.innerWidth > 800) {
            populateKeywords(5, 6, 4, 3, 5, 4);

        }
        else {
            populateKeywords(3, 4, 2, 2, 4, 3);
        }
        showKeywords();
    }, 500)
}

let wordPuke = document.querySelector(".word-puke");
let populateKeywords = (x, y, z, f, l, m) => {
    let textArray = text.split(" ");
    let paradArray = [];
    let k = 1;
    let c = 0;
    let dummy = [];
    console.log(textArray)
    for (let i = 0; i < textArray.length; i++) {
        dummy.push(textArray[i])
        c++;
        if (k % 3 == 0 && c % x == 0) {
            paradArray.push(dummy);
            dummy = [];
            k++;
            c = 1;
        }
        else if (k % 3 == 1 && c % y == 0) {
            paradArray.push(dummy);
            dummy = [];
            k++;
            c = 1;
        }
        else if (k % 3 == 2 && c % z == 0) {
            paradArray.push(dummy);
            dummy = [];
            k++;
            c = 1;
        }
        else {
            if (textArray.length - i == 2) {
                paradArray.push([textArray[i], textArray[i + 1]]);
            }
            if (textArray.length - i == 1) {
                paradArray.push([textArray[i]]);
            }
        }
    }
    console.log(paradArray)
    c = 0;
    for (let i = 0; i < paradArray.length; i++) {
        let div = document.createElement("div");
        c++;
        for (let j = 0; j < paradArray[i].length; j++) {
            let p = document.createElement("pre");
            p.innerHTML = paradArray[i][j] + " ";
            if (c % 3 == 0) {
                if (j == 0) {
                    p.style.fontSize = l + "rem";
                }
                if (j == f) {
                    p.style.fontSize = m + "rem";
                }
            }
            if (c % 3 == 1) {
                if (j == 0) {
                    p.style.fontSize = l + "rem";
                }
                if (j == f) {
                    p.style.fontSize = m + "rem";
                }
            }
            if (c % 3 == 2) {
                if (j == 0) {
                    p.style.fontSize = l + "rem";
                }
                if (j == f) {
                    p.style.fontSize = m + "rem";
                }
            }
            p.setAttribute("onclick", "this.classList.toggle('selected')");
            div.appendChild(p);
        }
        wordPuke.appendChild(div)
    }
}


favArtist.addEventListener('keyup', ({ key }) => {
    if (key === "Enter") {
        ArtistSend();
    }
})


let showKeywords = () => {
    gsap.to(".rest-2 > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-2 > input", { x: 2000, duration: 1 });
    setTimeout(() => {
        sections[2].classList.add("show-section");
        sections[1].classList.remove("show-section");
        let divs = document.querySelectorAll(".word-puke > div");
        let t1 = gsap.timeline();
        for (let i = 0; i < divs.length; i++) {
            for (let j = 0; j < divs[i].children.length; j++) {
                t1.to(divs[i].children[j], { opacity: 1, duration: 0.3 }, "-=0.1")
            }
        }
    }, 1000)
}


let genPrompt = () => {
    let promptDiv = document.querySelector(".multiple-prompts");
    let textArray = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.",];
    //Get Prompt from backend
    for (let i = 0; i < textArray.length; i++) {
        let prompt = document.createElement("div");
        prompt.classList.add("prompt");
        prompt.innerHTML = textArray[i];
        promptDiv.appendChild(prompt);
    }
    showPrompt();
}


let showPrompt = () => {
    gsap.to(".rest-3 > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-3 > .gen-story", { x: 2000, duration: 1 });
    gsap.to(".rest-3 > .word-puke", { opacity: 0, duration: 1 });
    setTimeout(() => {
        sections[3].classList.add("show-section");
        sections[2].classList.remove("show-section");
    }, 1000)
}

let storyTime = () => {
    let text = `okay so this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now`
    let textArray = text.split(" ");
    let storyDiv = document.querySelector(".rest-5 > div > .prompt");
    for (let i = 0; i < textArray.length; i++) {
        let span = document.createElement("span");
        if (i == 0) {
            span.classList.add("current-word");
        }
        if (i == textArray.length - 1) {
            span.classList.add("last-word");
        }
        span.innerHTML = textArray[i];
        storyDiv.appendChild(span)
    }
    showStory();
}




let showStory = () => {
    gsap.to(".rest-4 > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-4 > button", { x: 2000, duration: 1 });
    gsap.to(".rest-4 > .multiple-prompts", { opacity: 0, duration: 1 });
    setTimeout(() => {
        sections[4].classList.add("show-section");
        sections[3].classList.remove("show-section");
    }, 1000)
}



let inputDiv = document.querySelector(".type");
let typingInput = inputDiv.getElementsByTagName("input")[0];

let typeItOut = (ele) => {
    inputDiv.classList.add("typeitout");
    ele.innerHTML = "Retry";
    ele.setAttribute("onclick", "retry()");
}

let retry = () => {
    window.$("#typebox")[0].value = "";
    wordData = {
        seconds: 0,
        correct: 0,
        incorrect: 0,
        total: 0,
        typed: 0
    };
    let spans = document.querySelectorAll(".rest-5 > div > .prompt > span");
    for (let i = 0; i < spans.length; i++) {
        spans[i].classList = "";
        if (i == 0) {
            spans[i].classList.add("current-word")
        }
        if (i == spans.length - 1) {
            spans[i].classList.add("last-word");
        }
    }
    firstTime = true;
    document.querySelector(".wpm > span:nth-of-type(1)").innerHTML = "0";
    document.querySelector(".time").innerHTML = "0:00";
    clearInterval(timerVar);
    clearInterval(wpmTimer)
    removeResult();
    window.$("#typebox")[0].setAttribute("onkeyup", "typingTest(event)");

}


window.$ = document.querySelectorAll.bind(document);

String.prototype.removeCharAt = function (i) {
    var tmp = this.split(''); // convert to an array
    tmp.splice(i - 1, 1); // remove 1 element from the array (adjusting for non-zero-indexed counts)
    return tmp.join(''); // reconstruct the string
}
let wordData = {
    seconds: 0,
    correct: 0,
    incorrect: 0,
    total: 0,
    typed: 0
};

function checkWord(word) {
    const wlen = word.value.length;
    const wval = word.value.trim();

    // How much we have of the current word.
    const current = window.$(".current-word")[0];
    const currentSubstring = current.innerHTML.substring(0, wlen);

    // Check if we have any typing errors and make sure there is a real
    // word to check https://github.com/anschwa/typing-test/issues/2
    const noMatch = wval !== currentSubstring;
    const emptyWords = wval === '' || currentSubstring === '';

    if (noMatch || emptyWords) {
        current.classList.add("incorrect-word-bg");
        return false;
    } else {
        current.classList.remove("incorrect-word-bg");
        return true;
    }
}

function submitWord(word) {
    // Update current-word and keep track of correct & incorrect words
    const current = window.$(".current-word")[0];

    if (checkWord(word)) {
        current.classList.remove("current-word");
        current.classList.add("correct-word-c");
        wordData.correct += 1;

    } else {
        current.classList.remove("current-word", "incorrect-word-bg");
        current.classList.add("incorrect-word-c");
        wordData.incorrect += 1;
    }

    // Update wordData
    wordData.total = wordData.correct + wordData.incorrect;

    if (current.classList[0] == "last-word") {
        calculateWPM(wordData);
    }
    else {
        // Make the next word the new current-word.
        current.nextSibling.classList.add("current-word");
    }
}


function calculateWPM(data) {
    window.$("#typebox")[0].removeAttribute("onkeyup");
    clearInterval(timerVar);
    clearInterval(wpmTimer);
    console.log("here");
    const { seconds, correct, incorrect, total, typed } = data;
    const minutes = seconds / 60;
    const wpm = Math.max(0, Math.ceil(((typed / 5) - incorrect) / minutes));
    const accuracy = Math.ceil((correct / total) * 100);
    showResult(wpm, accuracy);
}

let timerP = document.querySelector(".time");
let min, sec;

let timer = () => {
    wordData.seconds++;
    min = Math.floor(wordData.seconds / 60);
    sec = wordData.seconds % 60;
    if (sec < 10) {
        timerP.innerHTML = min + ":0" + sec;
    }
    else {
        timerP.innerHTML = min + ":" + sec;
    }
}

let wpmP = document.querySelector(".wpm > span:nth-of-type(1)");

let wpm = () => {
    let minutes = wordData.seconds / 60;
    let wpm = Math.max(0, Math.ceil(((wordData.typed / 5) - wordData.incorrect) / minutes));
    wpmP.innerHTML = wpm;
}


let firstTime = true;
let timerVar;
function typingTest(e) {
    if (firstTime) {
        timerVar = setInterval(timer, 1000);
        wpmTimer = setInterval(wpm, 300);
        firstTime = false;
    }
    const SPACE = 32;

    // Get key code of current key pressed.
    e = e || window.event;
    const kcode = e.keyCode;
    const word = window.$("#typebox")[0];

    // Check if empty (starts with space)
    if (word.value.match(/^\s/g)) {
        word.value = "";
        return;
    }

    // Display typing test results when timer runs out.
    // const isGameover = isDone();
    // if (isGameover) {
    //     calculateWPM(wordData);
    //     return;
    // }

    // Otherwise, keep score when timer is on.
    checkWord(word);
    if (kcode === SPACE) {
        submitWord(word);
        window.$("#typebox")[0].value = "";
    }
    wordData.typed += 1;
}

let showResult = (wpm, acc) => {
    if (wpm) {
        let resDiv = document.querySelectorAll(".res");
        resDiv[0].getElementsByTagName("p")[1].innerHTML = wpm;
        resDiv[1].getElementsByTagName("p")[1].innerHTML = acc + "%";
        resDiv[2].getElementsByTagName("p")[1].innerHTML = wordData.incorrect;
    }
    document.querySelector(".result").classList.add("show-res")
}

let removeResult = () => {
    document.querySelector(".result").classList.remove("show-res");
}

window.$("#typebox")[0].value = "";









// ProceedDirectly();
// ArtistSend();
// genPrompt();
// storyTime();
// typeItOut();