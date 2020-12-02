let api = "http://13.127.82.76";
let sections = document.querySelectorAll("section");
sections = [].slice.call(sections, 0).reverse();


let ProceedDirectly = () => {
    gsap.to(".rest-1 > h1", { x: 2000, duration: 1 });
    gsap.to(".rest-1 > p:nth-of-type(1)", { x: 2000, duration: 1 });
    gsap.to(".rest-1 > p:nth-of-type(2)", { x: -2000, duration: 1 });
    gsap.to(".rest-1 > p:nth-of-type(3)", { x: -2000, duration: 1 });
    gsap.to(".rest-1 > button:nth-of-type(1)", { x: -2000, duration: 1 });
    gsap.to(".rest-1 > button:nth-of-type(2)", { x: -2000, duration: 1 });
    sections[1].classList.add("show-section-display")
    setTimeout(() => {
        sections[1].classList.add("show-section");
        sections[0].classList.remove("show-section");
        sections[0].classList.remove("show-section-display")

    }, 400)

}


let keywordsString = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, temporibus dolores ipsum quas nam unde neque ducimus";

let favArtist = document.querySelector("#fav-artist");
let ArtistSend = () => {
    //send the artist to the backend
    if (api == "") {
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
    else {
        var requestOptions = {
            method: 'GET',
            // body: JSON.stringify(raw),
            redirect: 'follow'
        };
        let loader = document.querySelector(".rest-2 > .loader");
        console.log(loader)
        loader.classList.add("show");

        fetch(api + "/context?name=" + document.querySelector("#fav-artist").value, requestOptions)
            .then(response => {
                loader.classList.remove("show");
                return response.json()
            })
            .then(result => {
                console.log(result);
                var raw = {
                    text: result["story"]
                }

                var requestOptions = {
                    method: 'POST',
                    body: JSON.stringify(raw),
                    redirect: 'follow'
                };

                fetch(api + "/keywords", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        let phrase = result["phrase"].replace(/"/gi, "");
                        phrase = phrase.replace(/‘/gi, "")
                        phrase = phrase.replace(/“/gi, "")
                        phrase = phrase.replace(/”/gi, "")
                        phrase = phrase.replace(/-/gi, "")
                        phrase = phrase.replace(/_/gi, "")
                        phrase = phrase.replace(/—/gi, "")


                        // phrase = phrase.replace(/./gi, "")
                        phrase = phrase.replace(/’/gi, "")
                        phrase = phrase.replace(/,/gi, "")


                        // phrase = phrase.replace(/+/gi, "")
                        console.log(phrase)
                        keywordsString = phrase;
                        if (window.innerWidth > 800) {
                            populateKeywords(5, 6, 4, 3, 5, 4);

                        }
                        else {
                            populateKeywords(3, 4, 2, 2, 4, 3);
                        }
                        showKeywords();
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    }
}





let wordPuke = document.querySelector(".word-puke");
let populateKeywords = (x, y, z, f, l, m) => {
    let textArray = keywordsString.split(" ");
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
    sections[2].classList.add("show-section-display")
    setTimeout(() => {
        sections[2].classList.add("show-section");
        sections[1].classList.remove("show-section");
        sections[1].classList.remove("show-section-display")
        let divs = document.querySelectorAll(".word-puke > div");
        let t1 = gsap.timeline();
        for (let i = 0; i < divs.length; i++) {
            for (let j = 0; j < divs[i].children.length; j++) {
                t1.to(divs[i].children[j], { opacity: 1, duration: 0.3 }, "-=0.1")
            }
        }
    }, 400)
}


let genPrompt = () => {
    let promptDiv = document.querySelector(".multiple-prompts");
    let textArray = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem iusto suscipit non aliquid accusantium saepe numquam praesentium nesciunt, ullam aperiam, minus ipsam dolor quo fugit id quidem minima ipsum.",];
    //Get Prompt from backend
    for (let i = 0; i < textArray.length; i++) {
        let prompt = document.createElement("div");
        prompt.classList.add("prompt");
        prompt.setAttribute("onclick", "selectPrompt(this)");
        prompt.innerHTML = textArray[i];
        promptDiv.appendChild(prompt);
    }
    showPrompt();
}


let selectPrompt = (ele) => {
    let prompts = document.querySelectorAll(".multiple-prompts > .prompt");
    for (let i = 0; i < prompts.length; i++) {
        if (prompts[i].classList[1] == "selected-prompt" && ele != prompts[i]) return;
    }
    ele.classList.toggle("selected-prompt")
}


let showPrompt = () => {
    gsap.to(".rest-3 > div > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-3 > .right", { x: 2000, duration: 1 });
    gsap.to(".rest-3 > div > .gen-story", { x: 2000, duration: 1 });
    gsap.to(".rest-3 > div > .word-puke", { opacity: 0, duration: 1 });
    sections[3].classList.add("show-section-display")
    setTimeout(() => {
        sections[3].classList.add("show-section");
        sections[2].classList.remove("show-section");
        sections[2].classList.remove("show-section-display")

    }, 400)
}

let story = `okay so this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now okay so this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now okay so this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now okay so this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now so come on man this is all i can do for now`


let storyTime = (a) => {
    if (api == "") {
        let flag = 0;
        if (a) {
            flag = 1;
        }
        else {
            let prompts = document.querySelectorAll(".multiple-prompts > .prompt");
            for (let i = 0; i < prompts.length; i++) {
                if (prompts[i].classList[1] == "selected-prompt") {
                    flag++;
                }
            }
        }
        if (flag != 0) {
            localStorage.setItem(
                "story", story
            );
            let storyDiv = document.querySelector(".rest-5 > div > .prompt");
            storyDiv.innerHTML = story;
            if (a) {
                showStory2();
            }
            else {
                showStory();
            }
        }
    }
    else {
        let flag = 0;
        if (a) {
            flag = 1;
        }
        else {
            let prompts = document.querySelectorAll(".multiple-prompts > .prompt");
            for (let i = 0; i < prompts.length; i++) {
                if (prompts[i].classList[1] == "selected-prompt") {
                    flag++;
                }
            }
        }
        if (flag == 0) {
            return;
        }
        var raw = "{\n    \"prompt\":\"The moon is actually a giant alien egg\"\n}";

        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };

        fetch(api + "/story", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(a)


                let text = result["story"];
                text = text.replace(/“/gi, "")
                text = text.replace(/”/gi, "")
                text = text.replace(/‘/gi, "")
                text = text.replace(/-/gi, "")
                text = text.replace(/_/gi, "")
                text = text.replace(/—/gi, "")


                // phrase = phrase.replace(/./gi, "")
                text = text.replace(/’/gi, "")
                text = text.replace(/,/gi, "")
                let storyDiv = document.querySelector(".rest-5 > div > .prompt");
                storyDiv.innerHTML = text;
                sessionStorage.setItem(
                    "story", text
                );

                if (a) {
                    showStory2();
                }
                else {
                    showStory();
                }

            })
            .catch(error => console.log('error', error));
    }
}




let showStory = () => {
    gsap.to(".rest-4 > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-4 > button", { x: 2000, duration: 1 });
    gsap.to(".rest-4 > .multiple-prompts", { opacity: 0, duration: 1 });
    sections[4].classList.add("show-section-display")
    setTimeout(() => {
        sections[4].classList.add("show-section");
        sections[3].classList.remove("show-section");
        sections[3].classList.remove("show-section-display")
    }, 400)
}



let keysArray = keywordsString.split(" ");
let keyPs = [];

let myOwnPrompt = () => {
    let keyDiv = document.querySelector(".keys");
    for (let i = 0; i < keysArray.length; i++) {
        let p = document.createElement("p");
        p.innerHTML = keysArray[i];
        keyDiv.appendChild(p);
        keyPs.push(p);
    }
    showMyOwnPrompt();
}

let createInput = document.querySelector(".createPrompt");
createInput.addEventListener("keypress", (key) => {
    checkWords(key.charCode)
});

function checkWords(key) {
    if (key == 32) {
        let inputArr = createInput.value.split(" ");
        for (let i = 0; i < keyPs.length; i++) {
            let flag = 0;

            for (let j = 0; j < inputArr.length; j++) {
                if (keyPs[i].innerHTML == inputArr[j]) {
                    keyPs[i].classList.add("done");
                    flag++;
                }
            }
            if (flag == 0) {
                keyPs[i].classList.remove("done");
            }
        }
    }
}



let showMyOwnPrompt = () => {
    gsap.to(".rest-3 > div > h1", { x: -2000, duration: 1 });
    gsap.to(".rest-3 > .right", { x: 2000, duration: 1 });
    gsap.to(".rest-3 > div > .gen-story", { x: 2000, duration: 1 });
    gsap.to(".rest-3 > div > .word-puke", { opacity: 0, duration: 1 });
    sections[5].classList.add("show-section-display")
    setTimeout(() => {
        sections[5].classList.add("show-section");
        sections[2].classList.remove("show-section");
        sections[2].classList.remove("show-section-display")

    }, 400)
}

let showStory2 = () => {
    gsap.to(".rest-4-5 > div > h1", { x: 2000, duration: 1 });
    gsap.to(".rest-4-5 > div > div > .left", { x: -2000, duration: 1 });
    gsap.to(".rest-4-5 > div > div > .right", { x: 2000, duration: 1 });
    sections[4].classList.add("show-section-display")
    setTimeout(() => {
        sections[4].classList.add("show-section");
        sections[5].classList.remove("show-section");
        sections[5].classList.remove("show-section-display")
    }, 400)
}

let reset = () => {
    console.log("here")
    location.reload();
}

let popupDiv = document.querySelector(".popup")
let sec5 = document.querySelector(".rest-5");
let pop = () => {
    sec5.classList.toggle("pop-active")
    popupDiv.classList.toggle("pop");
}






// ProceedDirectly();
// ArtistSend();
// genPrompt();
// storyTime();
// typeItOut();