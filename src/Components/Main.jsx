import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

const plainText = [
  "Jump, hop, skip, run.",
  "Blue sky, white clouds.",
  "Happy dogs; wagging tails.",
  "Bright sun: warm beach.",
  "Quick fox: brown fur.",
  "Fresh coffee; morning aroma.",
  "Sweet dreams; peaceful sleep.",
  "Laugh, smile, love, live.",
  "Open doors; endless possibilities.",
  "Music heals; soothes souls.",
  "Fast car: adrenaline rush.",
  "Tall trees: gentle breeze.",
  "Wildflowers bloom; nature's art.",
  "Quiet whispers; hidden secrets.",
  "Warm hugs; comforting embrace.",
  "Rainy days: cozy indoors.",
  "Sparkling stars: infinite universe.",
  "Time flies; cherish moments.",
  "New beginnings; fresh starts.",
  "Colorful balloons: joyful celebration.",
  "Golden sunset: painted sky.",
  "Peaceful river; flowing tranquility.",
  "Morning dew: fresh grass.",
  "Snowflakes dance; winter magic.",
  "Rainbow colors; vibrant spectrum.",
  "Dancing flames: crackling fire.",
  "Moonlit night; mystical beauty.",
  "Gentle waves: sandy shores.",
  "Autumn leaves: crisp air.",
  "Butterflies flutter; graceful elegance.",
  "Whispering winds; ancient stories.",
  "Jump, hop, skip, run.",
  "Blue sky, white clouds.",
  "Happy dogs, wagging tails.",
  "Bright sun, warm beach.",
  "Quick fox, brown fur.",
  "Fresh coffee, morning aroma.",
  "Sweet dreams, peaceful sleep.",
  "Laugh, smile, love, live.",
  "Open doors, endless possibilities.",
  "Music heals, soothes souls.",
  "Fast car, adrenaline rush.",
  "Tall trees, gentle breeze.",
];

const Main = () => {
  const presentText = useSelector((store) => store.AppReducer.presentText);

  const [inputtypes, setInputtypes] = useState("");
  const [presentChar, setPresentchar] = useState(presentText[0]);
  const [runtime, setRuntime] = useState(null);
  const [all, setAll] = useState(1);
  const [wrongChars, setWrongChars] = useState(0);
  const [currChar, setCurrChar] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [times, setTimes] = useState(null);
  const [allchar, setAllchar] = useState(0);
  const [wrongChar, setWrongChar] = useState(0);
  const [level, setLevel] = useState("plainText");
  const [play3] = useSound("click_sound.mp3");

  const dispatch = useDispatch();
  const textFieldRef = useRef(null); // Create a ref object
  const [textFieldProps, setTextFieldProps] = useState({});

  if (seconds % 300 === 0 && seconds !== 0 && times) {
    clearInterval(times);
    setSeconds(0);
    console.log("ll");
    const match = (Date.now() - runtime) / 1000;
    const WPM = Math.round(allchar / 5 / (match / 60));
    const NumWPM = Math.round((allchar - wrongChar) / 5 / (match / 60));
    const accuracy = Math.floor((NumWPM * 100) / WPM);
    dispatch({ type: "5MIN", payload: { allchar, WPM } });
  }

  function runTimer() {
    setAllchar(0);
    setWrongChar(0);
    let id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setTimes(id);
  }

  const handleTextChange = () => {
    if (level === "plainText") {
      const randomValue = Math.floor(Math.random() * plainText.length);

      setPresentchar(plainText[randomValue][0]);

      dispatch({ type: "CHANGE", payload: plainText[randomValue] });
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setInputtypes(value);
    if (seconds === 0 && !times) {
      let id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setTimes(id);
    }

    let test = "";
    for (let i = 0; i < value.length; i++) {
      test = test + presentText[i];
      if (value[i] === presentText[i] && currChar[i] === undefined) {
        currChar[i] = true;
        setCurrChar({ ...currChar });
      } else if (currChar[i] === undefined) {
        currChar[i] = false;
        setCurrChar({ ...currChar });
      }
    }

    if (value.length > inputtypes.length) {
      setAll((pre) => pre + 1);
      setAllchar(allchar + 1);
    }

    //  word per min
    if (!runtime) {
      setRuntime(Date.now());
    }

    if (test !== value) {
      setWrongChars(wrongChars + 1);
      setWrongChar(wrongChar + 1);
      if (inputtypes[value.length - 1] === presentText[value.length - 1]) {
        setPresentchar(presentText[value.length]);
      } else {
        setTextFieldProps({
          sx: {
            "& .MuiOutlinedInput-root": {
              borderColor: "red",
            },
          },
        });
      }
    } else {
      if (value[value.length - 1] === presentText[value.length - 1]) {
        setPresentchar(presentText[value.length]);
        setTextFieldProps({}); // Reset the textFieldProps to default styling
      }
    }

    if (test === value && value.length === presentText.length) {
      const match = (Date.now() - runtime) / 1000;
      const WPM = Math.round(all / 5 / (match / 60));
      const NumWPM = Math.round((all - wrongChars) / 5 / (match / 60));

      const accuracy = Math.floor((NumWPM * 100) / WPM);

      setInputtypes("");
      setRuntime(null);
      setAll(1);
      setCurrChar({});
      setWrongChars(0);
      dispatch({ type: "SHOW", payload: { wpm: WPM, accuracy: accuracy } });
      handleTextChange();
    }
  };

  useEffect(() => {
    handleTextChange();
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secondss = seconds % 60;

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection="column"
        alignItems={"center"}
        gap={"20px"}
        marginTop={"20px"}
        marginBottom={"30px"}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "30px" }}>Enter Next -</Typography>
          <Button
            variant="outlined"
            sx={{
              width: 110,
              color: "white",
              marginLeft: "20px",
              backgroundColor: "rgb(52, 79, 235)",
              fontSize: "22px",
              height: 50,
            }}
          >
            {presentChar === " " ? "Space" : presentChar}
          </Button>
        </Box>
        <Box
          sx={{
            fontSize: "30px",
          }}
        >
          Min: {minutes} Sec: {secondss} -
          {seconds === 0 && (
            <Button
              variant="outlined"
              sx={{
                marginLeft: "10px",
                width: 110,
                color: "white",
                backgroundColor: "rgb(52, 79, 235)",
                fontSize: "22px",
              }}
              onClick={runTimer}
            >
              Start
            </Button>
          )}
        </Box>
      </Box>
      <TextField
        placeholder="Start Typing........"
        ref={textFieldRef}
        sx={{
          width: { sm: 200, md: 700 },
          marginTop: "20px",
          "& .MuiInputBase-root": {
            height: 80,
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            ...(textFieldProps.error && {
              "& .MuiOutlinedInput-root": {
                border: " 2px solid yellow",
              },
            }),
          },
        }}
        inputProps={{ style: { fontSize: 30 } }}
        value={inputtypes}
        onChange={handleInput}
        onKeyUp={play3}
      />
    </div>
  );
};

export default Main;
