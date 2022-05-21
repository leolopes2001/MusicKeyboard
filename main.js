let keys = [...document.querySelectorAll(".key")];

function verify_key(the_key) {
  let new_keys = keys.map((key) => +key.dataset.key);
  return new_keys.indexOf(the_key);
}
function getKeyCode(e) {
  if (e.type === "click") {
    const the_key = +e.target.dataset.key;
    const exist = verify_key(the_key);

    if (exist !== -1) {
      return the_key;
    }
  }

  if (e.type === "keydown") {
    const the_key = e.keyCode;
    const exist = verify_key(the_key);

    if (exist !== -1) {
      return the_key;
    }
  }
}

function playNote(e) {
  const audioKeyCode = getKeyCode(e);

  const key = document.querySelector(`[data-key="${audioKeyCode}"]`);

  const cantFoundAnyKey = !key;

  if (cantFoundAnyKey) {
    return;
  }

  addPlayingClass(key);

  function addPlayingClass(key) {
    key.classList.add("playing");
  }

  let audios = [...document.querySelector(".audios").childNodes];
  let newAudios = audios.filter((el) => !(el.nodeType === 3));

  let arrObj = newAudios.map((el) => {
    return {
      audio: +el.dataset.key,
      src: el.src.replace("file:///", ""),
    };
  });

  let the_el = arrObj.filter((el) => el.audio === +key.dataset.key);

  let my_music = the_el[0].src;

  const music = new Audio(`${my_music}`);
  music.play();
}

const removeClass = (e) => {
  e.target.classList.remove("playing");
};

function registerEvents() {
  keys.forEach((key) => {
    key.addEventListener("click", playNote);
    key.addEventListener("transitionend", removeClass);
  });

  window.addEventListener("keydown", playNote);
}

window.addEventListener("load", registerEvents)