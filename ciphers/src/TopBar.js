import { React, Component } from "react";
import { Dropdown } from "semantic-ui-react";

const cipherOptions = [
    {
        key: "Vigenere Cipher",
        text: "Vigenere Cipher",
        value: 0,
    },
    {
        key: "Vernam Cipher",
        text: "Vernam Cipher",
        value: 1,
    },
    {
        key: "Ceasar Cipher",
        text: "Ceasar Cipher",
        value: 2,
    },
];

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.changeCurrentCipher = this.changeCurrentCipher.bind(this);
    }

    changeCurrentCipher(e, data) {
        this.props.cipherCallback(data.value);
    }

    render() {
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
                    onChange={this.changeCurrentCipher}
                />
            </div>
        );
    }
}

export default TopBar;
