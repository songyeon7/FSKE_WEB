function change() {
  const where = document.querySelector("short-cut");
  const what = document.querySelector("#what_os");
  const os = where.getAttribute("os");
  if (os == "win") {
    where.setAttribute("os", "mac");
    what.innerHTML = "mac";
  } else {
    where.setAttribute("os", "win");
    what.innerHTML = "win";
  }
}

class Shortcut extends HTMLElement {
  static get observedAttributes() {
    return ["os"];
  }

  attributeChangedCallback() {
    this.innerHTML = "";
    this.call();
  }

  async call() {
    const url = `/widget/${this.getAttribute("program")}/${this.getAttribute(
      "os"
    )}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.state) {
          this.render(data.data);
        } else {
          console.log(data.behavior);
          alert(data.data);
        }
      });
  }

  render(data) {
    let container = document.createElement("div");
    for (let i = 0; i < data.length; i++) {
      const newData = data[i];
      let box = document.createElement("div");
      box.style.width = "300px";
      box.style.height = "180px";
      box.style.margin = "5px";
      box.style.borderRadius = "10px";
      box.style.padding = "10px";
      box.style.backgroundColor = "#f1f1f1";
      box.style.display = "inline-block";
      let title = document.createElement("p");
      title.style.fontSize = "24px";
      title.style.margin = "0";
      title.style.color = "#1f1f1f";
      title.innerText = newData.name;
      box.appendChild(title);
      let mean = document.createElement("p");
      mean.style.fontSize = "18px";
      mean.style.margin = "0";
      mean.style.padding = "0";
      mean.style.marginBottom = "10px";
      mean.style.color = "#1f1f1f";
      mean.innerText = newData.mean;
      box.appendChild(mean);
      for (let i = 0; i < newData.key.length; i++) {
        let key = document.createElement("img");
        key.style.height = "30%";
        key.setAttribute("src", `/keys/${newData.key[i]}.svg`);
        box.appendChild(key);
        if (i < newData.key.length - 1) {
          let plus = document.createElement("img");
          plus.style.width = "20%";
          plus.style.height = "20%";
          plus.style.marginBottom = "10px";
          plus.setAttribute("src", "/keys/Union+.svg");
          box.appendChild(plus);
        }
      }
      container.appendChild(box);
    }
    this.appendChild(container);
  }
}

customElements.define("short-cut", Shortcut);
