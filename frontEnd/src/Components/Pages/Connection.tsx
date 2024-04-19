import React from "react";
import "../../CSS/utilities.css";
import { useNavigate } from "react-router-dom";
import ModelUserInfo from "../../Models/ModelUserInfo";

let pseudo: string

function onPseudoChange(e: React.ChangeEvent<HTMLInputElement>) {
  ModelUserInfo.pseudo = e.currentTarget.value;
  console.log(pseudo)
}



export default function Connection() {

  let navigate = useNavigate();

  const isPseudoCorrect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (ModelUserInfo.pseudo && ModelUserInfo.pseudo.length > 3) {
      navigate("/chat/" + ModelUserInfo.pseudo);
    }
  };

  return (
    <div className="fullCenter">

      <div style={{ display: "flex", alignItems: "top", alignContent: "top" }}>

        <span style={{ marginRight: "10px" }}>Pseudo : </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" onChange={(e) => onPseudoChange(e)}></input>
          <button style={{ marginTop: "10px" }} onClick={(e) => isPseudoCorrect(e)}>Ok</button>
        </div>

      </div>

    </div>
  );
}

