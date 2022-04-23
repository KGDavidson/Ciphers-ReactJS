import { Component } from "react";
import TopBar from "./TopBar";
import Vigenere from "./Vigenere";
import Vernam from "./Vernam";
import Caesar from "./Ceasar";

class App extends Component {
    constructor(props) {
        super(props);
        this.cipherScreens = [<Vigenere />, <Vernam />, <Caesar />];
        this.cipherScreen = 0;
        this.cipherCallback = this.cipherCallback.bind(this);
    }

    cipherCallback(cipher) {
        this.cipherScreen = cipher;
        this.setState({});
        console.log(cipher);
    }

    render() {
        return (
            <div className="App">
                <TopBar cipherCallback={this.cipherCallback} />
                {this.cipherScreens[this.cipherScreen]}
            </div>
        );
    }
}

export default App;
