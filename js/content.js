function appendAudioImage() {
  const audioImg = document.createElement("img");
  audioImg.setAttribute("src", "assets/images/icon-play.svg");
  document.getElementsByClassName("play-audio")[0].innerHTML = "";
  document.getElementsByClassName("play-audio")[0].append(audioImg);
}

function getAudio(phonetics) {
  const image = document.getElementsByClassName("play-audio")[0].children[0];
  image.addEventListener("click", () => {
    phonetics.forEach((phonetic) => {
      if(phonetic.audio.length) {
        new Audio(phonetic.audio).play();
      }
    })
  })
}

function createElement(tag, classname, content) {
  const element = document.createElement(tag);
  if(classname.length) element.classList.add(classname);
  if(content.length) element.innerHTML=content;
  return element;
}

function createMeaningWrapper(meaning) {
  // part Of Speech
  const parent1 = createElement("div", "pos", "");
  parent1.append(createElement("div", "part-of-speech", meaning.partOfSpeech));
  parent1.append(createElement("div", "line", ""));

  // Meaning
  const parent2 = document.createElement("div");
  parent2.append(createElement("div", "meaning", "Meaning"));
  
  const unorderedList = document.createElement("ul");
  unorderedList.classList.add("definations");

  meaning.definitions.forEach((defination) => {
    unorderedList.append(createElement("li", "", defination.definition));
  })

  parent2.append(unorderedList);

  const parent3 = document.createElement("div");
  parent3.append(createElement("span", "synonyms", "Synonyms:"));
  
  if(meaning.synonyms.length>=1) {
    parent3.append(createElement("span", "synonym", (" " + meaning.synonyms[0])));
  }  

  for(let i=1 ; i<meaning.synonyms.length ; ++i) {
    parent3.append(createElement("span", "synonym", (", " + meaning.synonyms[0])));
  } 

  return [parent1, parent2, parent3];
}

function createWordDictionaryPart(data) {
  // Json has an array of objects each objects has the all meaning and part of speech
  document.getElementById("word").innerHTML = data.word;
  document.getElementById("phonetic").innerHTML = data.phonetic;
  appendAudioImage();
  getAudio(data.phonetics);

  const dictContent = createElement("div", "", "");
  data.meanings.forEach((meaning) => {
    createMeaningWrapper(meaning).forEach((dict) => {
      dictContent.append(dict);
    })
  })

  return dictContent;
}

function urlSource(url) {
  const parent = createElement("div", "source-url", "");
  parent.append(createElement("div", "source", "Source"));
  const anchor = document.createElement("a");
  anchor.setAttribute("href", url);
  anchor.innerHTML = url;
  const anchorDiv = createElement("div", "url", "");
  anchorDiv.append(anchor);
  parent.append(anchorDiv);
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/images/icon-new-window.svg");
  const imageDiv = createElement("div", "", "");
  imageDiv.append(img);
  parent.append(imageDiv);
  return parent;
}

async function fetchAPI(word) {
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(URL);

  if(response.ok) {
    const json = await response.json();

    const content = document.getElementsByClassName("content")[0];
    const upperContent = document.getElementsByClassName("upper-content")[0];
    document.getElementsByClassName("content")[0].innerHTML = "";
    content.append(upperContent);

    const bottomContent = createElement("div", "bottom-content", "");

    json.forEach((data) => {
      bottomContent.append(createWordDictionaryPart(data));
    })

    content.append(bottomContent);
    content.append(urlSource(URL));
  }

}


const form = document.querySelector(".searchBar");

fetchAPI("keyboard");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchAPI(form[0].value);
})