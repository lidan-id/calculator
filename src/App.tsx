import "./app.css";
import { useState } from "react";

function isOperator(char) {
  return char === "+" || char === "-" || char === "/" || char === "*";
}
function Button({ item, setValueChange, value }) {
  const handleClick = () => {
    const lastIndex = value.length - 1;
    if (isOperator(item)) {
      if (value && isOperator(value[lastIndex]) && isOperator(item)) return;
      else if (!value && isOperator(item)) return;
    } else if (item === "C") {
      setValueChange("");
      return;
    } else if (item === "←") {
      setValueChange(value.slice(0, -1));
      return;
    } else if (item === "+/-") {
      if (!value || isOperator(item)) return;
      else {
        let tempp;
        for (let i = lastIndex; i >= 0; i--) {
          if (isOperator(value[i]) || i === 0) {
            if (i === 0) {
              tempp = value.slice(i);
            } else {
              tempp = value.slice(i + 1);
            }
          }
        }
      }
    } else if (item === "%") {
      if (
        !value ||
        (value && isOperator(value[lastIndex])) ||
        (value && value[lastIndex] === item)
      )
        return;
      else {
        let temp;
        for (let i = lastIndex; i >= 0; i--) {
          if (isOperator(value[i]) || i === 0) {
            if (i === 0) {
              temp = value.slice(i);
            } else {
              temp = value.slice(i + 1);
            }
            setValueChange(value.slice(0, -temp.length));
            console.log(temp);
            temp = parseFloat(temp) / 100;
            break;
          }
        }
        setValueChange((prev) => prev + temp.toString());
        return;
      }
    }
    setValueChange((prev) => prev + item);
  };

  return (
    <div onClick={handleClick} className="button">
      <span>{item}</span>
    </div>
  );
}
function App() {
  const [value, setValue] = useState("");
  const buttonType = [
    "C",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "3",
    "2",
    "1",
    "+",
    "0",
    ".",
    "←",
  ];
  return (
    <>
      <div className="container">
        <div className="topInput"> </div>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <div className="buttonContainer">
          {buttonType.map((item) => (
            <Button
              setValueChange={setValue}
              item={item}
              key={item}
              value={value}
            />
          ))}
          <div
            onClick={() => {
              setValue((prev) => eval(prev).toString());
            }}
            className="button"
          >
            =
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
