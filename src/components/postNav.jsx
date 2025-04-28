import React from "react";
import { useState } from "react";
import "./postNav.css";  // Create this CSS file
import Importpost from "./Importpost";
import Exportpost from "./Exportpost";
import Transportpost from "./Transportpost";
import { FiDownload } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";

function PostController() {
    const [currentComponent, setCurrentComponent] = useState(<Importpost />);
    const [activeButton, setActiveButton] = useState("importpost");

    const handleTradepost = (type) => {
        setActiveButton(type);
        if (type === "importpost") {
            setCurrentComponent(<Importpost />);
        }
        if (type === "exportpost") {
            setCurrentComponent(<Exportpost />);
        }
        if (type === "transportpost") {
            setCurrentComponent(<Transportpost />);
        }
    }

    return (
        <div className="post-controller">
            <div className="Nav-buttons">
                <button 
                    className={activeButton === "importpost" ? "active" : ""}
                    onClick={() => handleTradepost("importpost")}
                >
                    <FiDownload className="button-icon" />
                    <strong classname="btn-name">  Import</strong>
                </button>
                <button 
                    className={activeButton === "exportpost" ? "active" : ""}
                    onClick={() => handleTradepost("exportpost")}
                >
                    <FiUpload className="button-icon" />
                    <strong>  Export</strong>
                </button>
                <button 
                    className={activeButton === "transportpost" ? "active" : ""}
                    onClick={() => handleTradepost("transportpost")}
                >
                    <FiTruck className="button-icon" />
                    <strong> Transport</strong>
                </button>
            </div>
            <div className="component-container">
                {currentComponent}
            </div>
        </div>
    )
}

export default PostController;



