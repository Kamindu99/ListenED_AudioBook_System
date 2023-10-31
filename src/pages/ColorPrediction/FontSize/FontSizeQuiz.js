import React, { useState, useEffect } from "react";
import ColorSelector from "../ColorSelector";
import axios from "axios";

const FontSelector = () => {
  const savedFontSize1 = localStorage.getItem("fontSize");
  // const [fontSize, setFontSize] = useState(
  //   savedFontSize1 ? savedFontSize1 : "16px"
  // ); // Initial font size
  // const [fontWeight, setFontWeight] = useState(
  //   localStorage.getItem("fontWeight")
  //     ? localStorage.getItem("fontWeight")
  //     : "normal"
  // ); // Initial font weight
  // const [fontStyle, setFontStyle] = useState(
  //   localStorage.getItem("fontStyle")
  //     ? localStorage.getItem("fontStyle")
  //     : "normal"
  // ); // Initial font style
  const [fontSize, setFontSize] = useState("16px"); // Initial font size
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");

  const [fontSize1, setFontSize1] = useState("16px"); // Initial font size
  const [fontWeight1, setFontWeight1] = useState("normal"); // Initial font weight
  const [fontStyle1, setFontStyle1] = useState("normal");

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    const savedFontWeight = localStorage.getItem("fontWeight");
    const savedFontStyle = localStorage.getItem("fontStyle");

    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    if (savedFontWeight) {
      setFontWeight(savedFontWeight);
    }

    if (savedFontStyle) {
      setFontStyle(savedFontStyle);
    }
  }, []);

  const handleFontSizeChange = (event) => {
    const selectedSize = event.target.value;
    setFontSize(selectedSize);
  };

  const handleFontWeightChange = (event) => {
    const selectedWeight = event.target.value;
    setFontWeight(selectedWeight);
  };

  const handleFontStyleChange = (event) => {
    const selectedStyle = event.target.value;
    setFontStyle(selectedStyle);
  };

  const handleFontSizeChange1 = (event) => {
    console.log(event, "sssss");
    const selectedSize1 = event.target.value;
    setFontSize1(selectedSize1);
  };

  const handleFontWeightChange1 = (event) => {
    console.log(event, "sssss");
    const selectedWeight1 = event.target.value;
    setFontWeight1(selectedWeight1);
  };

  const handleFontStyleChange1 = (event) => {
    console.log(event, "sssss");
    const selectedStyle1 = event.target.value;
    setFontStyle1(selectedStyle1);
  };

  const handleSaveConfigurations = () => {
    // Create an object to store the selected configurations
    const selectedConfigurations = {
      fontSize,
      fontWeight,
      fontStyle,
    };

    // Store the selected configurations in local storage
    localStorage.setItem(
      "fontConfigurations",
      JSON.stringify(selectedConfigurations)
    );
    // localStorage.setItem("fontSize", JSON.stringify(fontSize));
    // localStorage.setItem("fontWeight", JSON.stringify(fontWeight));
    // localStorage.setItem("fontStyle", JSON.stringify(fontStyle));

    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("fontStyle", fontStyle);

    console.log("fontConfigurations", selectedConfigurations);

    const selectedConfigurationsArray = Object.values(selectedConfigurations);
    console.log("selectedConfigurationsArray", selectedConfigurationsArray);

    // window.location.replace("/");
    const userid = 9;

    axios
      .put("https://listened.onrender.com/usermanagement/", {
        userid: userid,
        fontconfig: selectedConfigurations,
      })
      .then((response) => {
        console.log(response.data);
      });

    // window.location.replace("/quiz");
  };

  const handleSaveConfigurations1 = () => {
    // Create an object to store the selected configurations
    const selectedConfigurations1 = {
      fontSize1,
      fontWeight1,
      fontStyle1,
    };

    // Store the selected configurations in local storage
    localStorage.setItem(
      "fontConfigurations",
      JSON.stringify(selectedConfigurations1)
    );
    localStorage.setItem("fontSize1", JSON.stringify(fontSize1));
    localStorage.setItem("fontWeight1", JSON.stringify(fontWeight1));
    localStorage.setItem("fontStyle1", JSON.stringify(fontStyle1));

    console.log("fontConfigurations", selectedConfigurations1);
    //make selected configurations an array
    const selectedConfigurationsArray = Object.values(selectedConfigurations1);
    console.log("selectedConfigurationsArray", selectedConfigurationsArray);

    const userid = 9;

    axios
      .put("https://listened.onrender.com/usermanagement/", {
        userid: userid,
        topicfontconfig: selectedConfigurations1,
      })
      .then((response) => {
        console.log(response.data);
      });

    // window.location.replace("/quiz");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <p style={{ fontSize: "20px" }}> කුඩා අකුරු සදහා </p>
          <div className=" p-4">
            <div className="mb-3 ">
              <label htmlFor="fontSize" className="form-label me-2">
                Font Size:
              </label>

              <select
                id="fontSize"
                className="form-control"
                // value={fontSize}
                onChange={handleFontSizeChange}
                defaultValue={fontSize}
              >
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="30px">30px</option>
                <option value="40px">40px</option>
                <option value="50px">50px</option>
                <option value="70px">70px</option>
                {/* Add more font size options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fontWeight" className="form-label me-2">
                Font Weight:
              </label>
              <select
                id="fontWeight"
                className="form-control"
                // value={fontWeight}
                onChange={handleFontWeightChange}
                defaultValue={fontWeight}
              >
                <option value="100">Thin</option>
                <option value="normal">Normal</option>
                <option value="550">Semibold</option>
                <option value="900">Bold</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fontStyle" className="form-label me-2">
                Font Style:
              </label>
              <select
                id="fontStyle"
                className="form-control "
                // value={fontStyle}
                onChange={handleFontStyleChange}
                defaultValue={fontStyle}
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                {/* Add more font style options as needed */}
              </select>
            </div>
            <div>
              <p
                style={{
                  fontSize,
                  fontWeight,
                  fontStyle: fontStyle === "italic" ? "italic" : "normal",
                  marginTop: "20px",
                }}
              >
                සාදරෙයෙන් පිලිගනිමු
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSaveConfigurations}
            >
              Save Configurations
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <p style={{ fontSize: "20px" }}> මාතෘකා සදහා </p>
          <div className=" p-4">
            <div className="mb-3 ">
              <label htmlFor="fontSize" className="form-label me-2">
                Font Size:
              </label>

              <select
                id="fontSize1"
                className="form-control"
                // value={fontSize}
                onChange={handleFontSizeChange1}
                defaultValue={fontSize1}
              >
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="30px">30px</option>
                <option value="40px">40px</option>
                <option value="50px">50px</option>
                <option value="70px">70px</option>
                {/* Add more font size options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fontWeight" className="form-label me-2">
                Font Weight:
              </label>
              <select
                id="fontWeight1"
                className="form-control"
                // value={fontWeight}
                onChange={handleFontWeightChange1}
                defaultValue={fontWeight1}
              >
                <option value="100">Thin</option>
                <option value="normal">Normal</option>
                <option value="550">Semibold</option>
                <option value="900">Bold</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fontStyle" className="form-label me-2">
                Font Style:
              </label>
              <select
                id="fontStyle1"
                className="form-control "
                // value={fontStyle}
                onChange={handleFontStyleChange1}
                defaultValue={fontStyle1}
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                {/* Add more font style options as needed */}
              </select>
            </div>
            <div>
              <p
                style={{
                  fontSize: fontSize1,
                  fontWeight: fontWeight1,
                  fontStyle: fontStyle1 === "italic" ? "italic" : "normal",
                  marginTop: "20px",
                }}
              >
                සාදරෙයෙන් පිලිගනිමු
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSaveConfigurations1}
            >
              Save Configurations
            </button>
          </div>
        </div>

        {/* <ColorSelector/> */}
      </div>
    </div>
  );
};

export default FontSelector;
