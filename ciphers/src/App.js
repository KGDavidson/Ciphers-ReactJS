import { React, Component, useState } from "react";
import TopBar from "./TopBar";
import Cipher from "./Cipher";
import Controller from "./Controller";
import GraphVis from "./GraphVis";
import MathVis from "./MathVis";

const App = () => {
    const [visScreen, setVisScreen] = useState(0);
    const [plaintext, setPlaintext] = useState("The Quick Brown Fox");
    const [key, setKey] = useState("SecureKey");
    const [ciphertext, setCiphertext] = useState("");
    const [highlight, setHighlight] = useState([-1, -1]);

    const isUppercase = (c) => {
        return 65 <= c && c <= 90;
    };

    const isLowercase = (c) => {
        return 97 <= c && c <= 122;
    };

    const vis = [
        <GraphVis highlight={highlight}></GraphVis>,
        <MathVis
            plaintext={plaintext}
            ciphertext={ciphertext}
            cipherKey={key}
            isUppercase={isUppercase}
            isLowercase={isLowercase}
        ></MathVis>,
    ];

    const cipherCallback = (cipher) => {
        setVisScreen(cipher);
    };

    const filterKey = (key) => {
        var result = [];
        for (var i = 0; i < key.length; i++) {
            var c = key.charCodeAt(i);
            if (isUppercase(c) || isLowercase(c)) result.push((c - 65) % 32);
        }
        return result;
    };

    const decryptFunction = () => {
        var newKey = filterKey(key);
        for (var i = 0; i < newKey.length; i++)
            newKey[i] = (26 - newKey[i]) % 26;

        algorithm(ciphertext, newKey, setPlaintext);
    };

    const encryptFunction = () => {
        var newKey = filterKey(key);

        algorithm(plaintext, newKey, setCiphertext);
    };

    const timeout = (delay) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, delay);
        });
    };

    const algorithm = async (input, key, setFunction) => {
        var output = "";
        for (var i = 0, j = 0; i < input.length; i++) {
            await timeout(250);
            var c = input.charCodeAt(i);

            setHighlight([
                key[j % key.length],
                input.toUpperCase().charCodeAt(i) - 65,
            ]);

            if (isUppercase(c)) {
                output += String.fromCharCode(
                    ((c - 65 + key[j % key.length]) % 26) + 65
                );
                j++;
            } else if (isLowercase(c)) {
                output += String.fromCharCode(
                    ((c - 97 + key[j % key.length]) % 26) + 97
                );
                j++;
            } else {
                output += input.charAt(i);
            }
            setFunction(output);
        }
        return output;
    };

    return (
        <div className="App">
            <TopBar cipherCallback={cipherCallback} />
            <Controller
                plaintext={plaintext}
                setPlaintext={setPlaintext}
                ciphertext={ciphertext}
                setCiphertext={setCiphertext}
                cipherKey={key}
                setKey={setKey}
                encrypt={encryptFunction}
                decrypt={decryptFunction}
            ></Controller>
            {vis[visScreen]}
        </div>
    );
};

export default App;
