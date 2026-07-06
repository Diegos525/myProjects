import {useState} from "react";
import {Button, TextField } from "@mui/material";
import "./App.css";


function CalcButton(props) {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={props.color}
    >
      {props.text}
    </Button>
  );
}

function Cockku(){
  
  const [screen, setScreen] = useState("");
  const [activeOperator, setActiveOperator] = useState("");



 const handleClick = (value) => {
  const operators = ["+", "-", "*", "/"];

  if (value === "=") {
    try {
      setScreen(parseFloat(eval(screen).toFixed(10)).toString());
      setActiveOperator("");
    } catch {
      setScreen("Error");
      setActiveOperator("");
    }
  }

  else if (
    operators.includes(value) &&
    operators.includes(screen.slice(-1))
  ) {
    setActiveOperator(value);
    setScreen(screen.slice(0, -1) + value);
  }

  else if (operators.includes(value)) {
    setActiveOperator(value);
    setScreen((prev) => prev + value);
  }

  else if (value === ".") {
    let parts = screen.split(/[+\-*/]/);
    let currentNumber = parts[parts.length - 1];

    if (currentNumber.includes(".")) {
      return;
    }

    setActiveOperator("");
    setScreen((prev) => prev + value);
  }

  else {
    setActiveOperator("");
    setScreen((prev) => prev + value);
  }
};
  
  
  return ( 
     <>
       <h1>Calculator REACT</h1>
    <div className= "calculator"
   > 
    
      <TextField 
        value={screen}
        className="screen"
        variant="outlined"
      />
      
     <div className="buttons">
     <CalcButton
  text="1"
  onClick={() => handleClick("1")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="2"
  onClick={() => handleClick("2")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="3"
  onClick={() => handleClick("3")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="4"
  onClick={() => handleClick("4")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="5"
  onClick={() => handleClick("5")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="6"
  onClick={() => handleClick("6")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
      <CalcButton
  text="7"
  onClick={() => handleClick("7")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
        <CalcButton
  text="8"
  onClick={() => handleClick("8")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
       <CalcButton
  text="9"
  onClick={() => handleClick("9")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
       <CalcButton
  text="0"
  onClick={() => handleClick("0")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
       <CalcButton
  text="."
  onClick={() => handleClick(".")}
  color={{
    backgroundColor: "#001eb2",
  }}
/>
    
       
       <CalcButton
  text="+"
  className={activeOperator === "+" ? "operator active" : "operator"}
  onClick={() => handleClick("+")}
  color={{
    backgroundColor: "#5800dc",
  }}
/>
        
        <CalcButton
  text="-"
  className={activeOperator === "-" ? "operator active" : "operator"}
  onClick={() => handleClick("-")}
  color={{
    backgroundColor: "#5800dc",
  }}
/>
         <CalcButton
  text="/"
  className={activeOperator === "/" ? "operator active" : "operator"}
  onClick={() => handleClick("/")}
  color={{
    backgroundColor: "#5800dc",
  }}
/>
         <CalcButton
  text="x"
  className={activeOperator === "*" ? "operator active" : "operator"}
  onClick={() => handleClick("*")}
  color={{
    backgroundColor: "#5800dc",
  }}
/>
       <CalcButton
  text="="
  className={activeOperator === "=" ? "operator active" : "operator"}
  onClick={() => handleClick("=")}
  color={{
    backgroundColor: "#5800dc",
  }}
/>
      <CalcButton 
      text="C"
      variant="contained"
       sx={{
          backgroundColor: "#009116",
    "&:hover": {
      backgroundColor: "#77ff01",
    },

        }}
      onClick={() => {
        setScreen("");
        setActiveOperator("");
      }

      }
       >
      C
      </CalcButton> 
      </div>

    </div>
    </>
  );


}
export default Cockku;