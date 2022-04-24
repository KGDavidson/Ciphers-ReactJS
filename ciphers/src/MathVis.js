const MathVis = (props) => {
    var plaintextCells;
    var keyCells;
    var ciphertextCells;

    const letterCell = (c, className = "cellCharCode") => {
        if (props.ciphertext.length < 1 && props.plaintext.length < 1) {
            return <div></div>;
        }
        var charCode = c.charCodeAt(0);
        switch (c) {
            case "ﬦ": {
                return (
                    <div className="expand symbolCells">
                        <svg
                            className="symbolSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 360.96 358.98"
                        >
                            <text
                                className="cellSymbol"
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                +
                            </text>
                        </svg>
                    </div>
                );
            }
            case "ﬥ": {
                return (
                    <div className="expand symbolCells">
                        <svg
                            className="symbolSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 360.96 358.98"
                        >
                            <text
                                className="cellSymbol"
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                =
                            </text>
                        </svg>
                    </div>
                );
            }
            case "ﬤ": {
                return (
                    <div className="expand symbolCells">
                        <svg
                            className="symbolSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 360.96 358.98"
                        >
                            <text
                                className="cellSymbol"
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                =
                            </text>
                        </svg>
                    </div>
                );
            }
            case "ﬣ": {
                return (
                    <div className="expand symbolCells">
                        <svg
                            className="symbolSvg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 360.96 358.98"
                        >
                            <text
                                className="cellSymbol"
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                -
                            </text>
                        </svg>
                    </div>
                );
            }
        }
        if (props.isUppercase(charCode)) {
            charCode = charCode - 65;
        } else if (props.isLowercase(charCode)) {
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
                        className={className}
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
        var modifiedText = props.plaintext;
        if (props.ciphertext.length > props.plaintext.length) {
            for (
                var i = 0;
                i < props.ciphertext.length - props.plaintext.length;
                i++
            ) {
                modifiedText += " ";
            }
        }

        plaintextCells = ("ﬦ" + modifiedText + "ﬤ").split("").map((c) => {
            return letterCell(c);
        });
    };

    const setKeyCells = () => {
        var newKey = "";
        var text = props.ciphertext;
        if (props.plaintext.length > props.ciphertext.length) {
            text = props.plaintext;
        }
        for (var i = 0, j = 0; i < text.length; i++) {
            var c = text.charCodeAt(i);
            if (props.isUppercase(c) || props.isLowercase(c)) {
                newKey += props.cipherKey.charAt(j % props.cipherKey.length);
                j++;
            } else {
                newKey += text.charAt(i);
            }
        }

        keyCells = ("ﬥ" + newKey + "ﬣ").split("").map((c) => {
            return letterCell(c);
        });
    };

    const setCiphertextCells = () => {
        var modifiedText = props.ciphertext;
        if (props.plaintext.length > props.ciphertext.length) {
            for (
                var i = 0;
                i < props.plaintext.length - props.ciphertext.length;
                i++
            ) {
                modifiedText += " ";
            }
        }
        ciphertextCells = (" " + modifiedText + " ").split("").map((c) => {
            return letterCell(c, "cellCharCode cellTotal");
        });
    };

    setPlaintextCells();
    setKeyCells();
    setCiphertextCells();

    return (
        <div>
            <div className="row">{plaintextCells}</div>
            <div className="row">{keyCells}</div>
            <div className="row">{ciphertextCells}</div>
        </div>
    );
};

export default MathVis;
