import { React, Component } from "react";
import { Dropdown } from "semantic-ui-react";

const cipherOptions = [
    {
        key: "Table Visualisation",
        text: "Table Visualisation",
        value: 0,
    },
    {
        key: "Mathematical Visualisation",
        text: "Mathematical Visualisation",
        value: 1,
    },
];

const TopBar = (props) => {
    const changeCurrentCipher = (e, data) => {
        props.cipherCallback(data.value);
    };

    return (
        <div className="topbar">
            <Dropdown
                button
                className="dropdown"
                placeholder="Select Cipher"
                fluid
                selection
                options={cipherOptions}
                defaultValue={0}
                onChange={changeCurrentCipher}
            />
        </div>
    );
};

export default TopBar;
