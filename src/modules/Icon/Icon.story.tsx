import React from "react";
import Icon from "./Icon";
import "../../stories/style.scss";
import { ButtonText } from "../Typography";

export const IconGallery = () => {
    return <div className="icon-gallery">
        <div className="icon-container">
            <Icon name="add" size={20}/>
            <ButtonText>add</ButtonText>
        </div>
        <div className="icon-container">
            <Icon name="arrow" size={20}/>
            <ButtonText>arrow</ButtonText>
        </div>
        <div className="icon-container">
            <Icon name="arrow-down" size={20}/>
            <ButtonText>arrow-down</ButtonText>
        </div>
        <div className="icon-container">
            <Icon name="add" size={20}/>
            <ButtonText>add</ButtonText>
        </div>
    </div>
}