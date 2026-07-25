# 🎨 Background Color Switcher

A simple and interactive web application that changes the webpage background color with a single button click. Built using **HTML**, **CSS**, and **JavaScript**.

---

## 🚀 Live Demo

> Add your GitHub Pages link here after deployment.

Example:

https://your-username.github.io/background-color-switcher/

---

## 📸 Preview

![Project Preview](preview.png)

> Replace `preview.png` with your project screenshot.

---

## ✨ Features

- 🎨 Changes the background color on every button click.
- 🌈 Cycles through multiple predefined colors.
- 🔁 Automatically loops back to the first color.
- 📱 Responsive design.
- ❤️ Clean footer with author credit.

---

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6)

---

## 📂 Project Structure

```
background-color-switcher/
│
├── index.html
├── style.css
├── README.md
└── preview.png
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/background-color-switcher.git
```

Go to the project folder:

```bash
cd background-color-switcher
```

Open `index.html` in your browser.

Or use **VS Code Live Server**.

---

## 💻 How It Works

1. Click the **Switch Color** button.
2. The background color changes.
3. Each click displays the next color in the array.
4. After the last color, it starts again from the first.

---

## 📜 JavaScript Logic

```javascript
const colors = [
  "#40E0D0",
  "#FF7F50",
  "#6495ED",
  "#FFBF00",
  "#DE3163",
  "#FFA600",
  "#B200FF",
  "#FF005D",
  "#5694EE",
  "#72E824"
];

let index = 0;

button.addEventListener("click", () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
});
```

---

## 🎯 Future Improvements

- 🌈 Generate random colors.
- 🎨 Color picker support.
- 🌙 Dark/Light mode.
- 📋 Copy HEX color to clipboard.
- 💾 Save selected color using Local Storage.
- ✨ Smooth background transition animations.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a Pull Request.

---

## 👨‍💻 Author

**Probal Dhali**

- GitHub: https://github.com/probal2005
- LinkedIn: https://www.linkedin.com/in/probal-dhali

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.