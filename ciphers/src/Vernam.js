import { React, useState } from "react";
import { Button, Header, Input, Table } from "semantic-ui-react";

const Vernam = () => {
    const [plaintext, setPlaintext] = useState("The Quick Brown Fox");
    const [ciphertext, setCiphertext] = useState("");
    const [key, setKey] = useState("SecureKey");

    var plaintextCells;
    var keyCells;
    var ciphertextCells;

    const isUppercase = (c) => {
        return 65 <= c && c <= 90;
    };

    const isLowercase = (c) => {
        return 97 <= c && c <= 122;
    };

    const letterCell = (c) => {
        var charCode = c.charCodeAt(0);
        if (isUppercase(charCode)) {
            charCode = charCode - 65;
        } else if (isLowercase(charCode)) {
            console.log("test");
            charCode = charCode - 97;
        } else {
            charCode = "";
        }
        return (
            <div className="expand letterCells">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 360.96 358.98"
                >
                    <text
                        className="cellText"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {c}
                    </text>
                    <text
                        className="cellCharCode"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {charCode}
                    </text>
                </svg>
            </div>
        );
    };

    const setPlaintextCells = () => {
        var modifiedText = plaintext;
        if (ciphertext.length > plaintext.length) {
            for (var i = 0; i < ciphertext.length - plaintext.length; i++) {
                modifiedText += " ";
            }
        }

        plaintextCells = (" " + modifiedText + " ").split("").map((c) => {
            return letterCell(c);
        });
    };

    const setKeyCells = () => {
        var newKey = "";
        var text = ciphertext;
        if (plaintext.length > ciphertext.length) {
            text = plaintext;
        }
        for (var i = 0, j = 0; i < text.length; i++) {
            var c = text.charCodeAt(i);
            if (isUppercase(c) || isLowercase(c)) {
                newKey += key.charAt(j % key.length);
                j++;
            } else {
                newKey += text.charAt(i);
            }
        }

        keyCells = (" " + newKey + " ").split("").map((c) => {
            return letterCell(c);
        });
    };

    const setCiphertextCells = () => {
        var modifiedText = ciphertext;
        if (plaintext.length > ciphertext.length) {
            for (var i = 0; i < plaintext.length - ciphertext.length; i++) {
                modifiedText += " ";
            }
        }
        ciphertextCells = (" " + modifiedText + " ").split("").map((c) => {
            return letterCell(c);
        });
    };

    setPlaintextCells();
    setKeyCells();
    setCiphertextCells();

    const filterKey = (key) => {
        var result = [];
        for (var i = 0; i < key.length; i++) {
            var c = key.charCodeAt(i);
            if (isUppercase(c) || isLowercase(c)) result.push((c - 65) % 32);
        }
        return result;
    };

    const decrypt = async () => {
        var newKey = filterKey(key);

        var output = "";
        for (var i = 0, j = 0; i < ciphertext.length; i++) {
            await timeout(200);

            var ciphertextCharCode = ciphertext.charCodeAt(i);
            var keyCharCode = newKey[j % newKey.length];

            if (isUppercase(plaintextCharCode)) {
                var plaintextCharCode =
                    ((plaintextCharCode - newKey[j % newKey.length]) % 26) + 65;
                output += String.fromCharCode(ciphertextCharCode);
                j++;
            } else if (isLowercase(plaintextCharCode)) {
                var plaintextCharCode =
                    ((plaintextCharCode - newKey[j % newKey.length]) % 26) + 97;
                output += String.fromCharCode(ciphertextCharCode);
                j++;
            } else {
                output += plaintext.charAt(i);
            }
            setPlaintext(output);
        }
        return output;
    };

    const encrypt = async () => {
        var newKey = filterKey(key);

        var output = "";
        for (var i = 0, j = 0; i < plaintext.length; i++) {
            await timeout(200);

            var plaintextCharCode = plaintext.charCodeAt(i);
            var keyCharCode = newKey[j % newKey.length];

            if (isUppercase(plaintextCharCode)) {
                var ciphertextCharCode =
                    ((plaintextCharCode + newKey[j % newKey.length]) % 26) + 65;
                output += String.fromCharCode(ciphertextCharCode);
                j++;
            } else if (isLowercase(plaintextCharCode)) {
                var ciphertextCharCode =
                    ((plaintextCharCode + newKey[j % newKey.length]) % 26) + 97;
                output += String.fromCharCode(ciphertextCharCode);
                j++;
            } else {
                output += plaintext.charAt(i);
            }
            setCiphertext(output);
        }
        return output;
    };

    const timeout = (delay) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, delay);
        });
    };

    return (
        <div className="vernam">
            <div className="row">
                <Input
                    className="textInput"
                    placeholder="Plaintext"
                    iconPosition="left"
                    icon="font"
                    value={plaintext}
                    onChange={(event) => {
                        setPlaintext(event.target.value);
                        setCiphertext("");
                    }}
                ></Input>
                <div className="column expand">
                    <Input
                        iconPosition="left"
                        icon="key"
                        placeholder="Key"
                        value={key}
                        onChange={(event) => {
                            setKey(event.target.value);
                        }}
                    ></Input>
                    <div className="row">
                        <Button
                            className="expand"
                            color="red"
                            inverted
                            onClick={encrypt}
                        >
                            Encrypt
                        </Button>
                        <Button
                            className="expand"
                            color="green"
                            inverted
                            onClick={decrypt}
                        >
                            Decrypt
                        </Button>
                    </div>
                </div>
                <Input
                    className="textInput"
                    iconPosition="left"
                    icon="hashtag"
                    placeholder="Ciphertext"
                    value={ciphertext}
                    onChange={(event) => {
                        setCiphertext(event.target.value);
                        setPlaintext("");
                    }}
                ></Input>
            </div>
            <div className="row">{plaintextCells}</div>
            <div className="row">{keyCells}</div>
            <div className="row">{ciphertextCells}</div>
        </div>
    );
};

export default Vernam;
