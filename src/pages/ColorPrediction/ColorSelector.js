import React, { useState } from "react";
import ColorBox from "./ColorBox";
import axios from "axios";

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [initials, setInitial] = useState(true);
  const [initials2, setInitial2] = useState(false);
  const [initials3, setInitial3] = useState(false);
  const [initials4, setInitial4] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [colorSet1, setColourset1] = useState([]);
  const [colorSet2, setColourset2] = useState([]);
  const [colorSet3, setColourset3] = useState([]);

  const colors = [
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#00FF00",
    "#008000",
    "#00FFFF",
    "#0000FF",
    "#4B0082",
    "#EE82EE",
    "#FF00FF",
    "#FFC0CB",
    "#FF7F50",
    "#FFD700",
    "#FFF700",
    "#7FFF00",
    "#00FFFF",
    "#40E0D0",
    "#87CEEB",
    "#E6E6FA",
    "#FF00FF",
  ];

  //First color selection
  const handleColorSelect = (color) => {
    color = color.slice(1);
    setSelectedColor(color);
    console.log(color);
    setInitial(false);
    setIsLoading(true);

    axios
      .post("http://127.0.0.1:8000/predictcolor/", {
        color: color,
      })
      .then((res) => {
        console.log(res);
        const modifiedData = res.data.predictedcolors.map((item) => {
          return {
            Hex: `#${item["Hex (24 bit)"]}`,
            Name: item["Name"],
          };
        });

        setColourset1(modifiedData);
        console.log(modifiedData);
      });

    setTimeout(() => {
      setIsLoading(false);
      setInitial(false);
      setInitial2(true);
      setInitial3(false);
      setInitial4(false);
    }, 2000);
  };

  //Second color selection
  const handleColorSelect2 = (color) => {
    color = color.slice(1);
    setSelectedColor(color);
    console.log(color);
    setIsLoading(true);
    setInitial2(false);
    axios
      .post("http://127.0.0.1:8000/predictcolor/", {
        color: color,
      })
      .then((res) => {
        const modifiedData = res.data.predictedcolors.map((item) => {
          return {
            Hex: `#${item["Hex (24 bit)"]}`,
            Name: item["Name"],
          };
        });

        setColourset2(modifiedData);
        console.log(res.data);
      });
    setTimeout(() => {
      setIsLoading(false);
      setInitial(false);
      setInitial2(false);
      setInitial3(true);
      setInitial4(false);
    }, 2000);
  };

  //Third color selection
  const handleColorSelect3 = (color) => {
    color = color.slice(1);
    setSelectedColor(color);
    console.log(color);
    setIsLoading(true);
    setInitial3(false);
    // axios
    //   .post("http://127.0.0.1:8000/predictcolor/", {
    //     color: color,
    //   })
    //   .then((res) => {
    //     const modifiedData = res.data.predictedcolors.map((item) => {
    //       return {
    //         Hex: `#${item["Hex (24 bit)"]}`,
    //         Name: item["Name"],
    //       };
    //     });

    //     setColourset3(modifiedData);
    //     console.log(res.data);
    //   });
    setTimeout(() => {
      setIsLoading(false);
      setInitial(false);
      setInitial2(false);
      setInitial3(false);
      setInitial4(true);
    }, 2000);
  };

  return (
    <center>
      <div className="container" style={{ padding: "100px" }}>
        <h1>වර්ණ ඵලකය</h1>
        {isLoading && "Loading...."}
        {initials && (
          <>
            <br />
            <h2>ඔබගේ පළමු වර්ණය තෝරන්න </h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </>
        )}

        {initials2 && (
          <>
            <br />
            <h2>ඔබගේ දෙවන වර්ණය තෝරන්න </h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect2(color)}
                />
              ))}
            </div>
          </>
        )}

        {initials3 && (
          <>
            <br />
            <h2>ඔබගේ තෙවන වර්ණය තෝරන්න </h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {colors.map((color) => (
                <ColorBox
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => handleColorSelect3(color)}
                />
              ))}
            </div>
          </>
        )}

        {initials4 && (
          <>
            <br />
            {colorSet1 && (
              <>
                <h2>First Color Set Prediction</h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {colorSet1.map((color) => (
                    <ColorBox key={color} color={color.Hex} />
                  ))}
                </div>
              </>
            )}
            <br />
            {colorSet2 && (
              <>
                <h2>Second Color Set Prediction</h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {colorSet2.map((color) => (
                    <ColorBox key={color} color={color.Hex} />
                  ))}
                </div>
              </>
            )}
            <br />
            {colorSet3 && (
              <>
                <h2>Third Color Set Prediction </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {colorSet3.map((color) => (
                    <ColorBox key={color} color={color.Hex} />
                  ))}
                </div>
              </>
            )}
            <button
              style={{
                marginTop: "30px",
                padding: "10px 20px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              onClick={() => {
                setInitial(true);
                setInitial2(false);
                setInitial3(false);
                setInitial4(false);
                setColourset1(null);
                setColourset2(null);
                setColourset3(null);
              }}
            >
              Back to Color Palette
            </button>
          </>
        )}
      </div>
    </center>
  );
};

export default ColorSelector;
