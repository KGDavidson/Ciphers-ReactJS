import { React, useState } from "react";
import { Button, Input, Table } from "semantic-ui-react";

const range = (start, stop, step = 1) => {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
};

function moveToEnd(arr, x) {
    let n = arr.length;
    x = x % n;

    let first_x_elements = arr.slice(0, x);

    let remaining_elements = arr.slice(x, n);
    arr = [...remaining_elements, ...first_x_elements];

    return arr;
}

const Vigenere = () => {
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [key, setKey] = useState("");
    const [highlight, setHighlight] = useState([-1, -1]);

    var charCodes = range(65, 90);
    var headerCells = charCodes.map(function (i) {
        return <Table.HeaderCell>{String.fromCharCode(i)}</Table.HeaderCell>;
    });

    var rowCells = charCodes.map(function (i, indexI) {
        return (
            <Table.Row>
                <Table.Cell>{String.fromCharCode(i)}</Table.Cell>
                {moveToEnd(charCodes, i - 65).map(function (j, indexJ) {
                    if (highlight[0] > 0 && highlight[1] > 0) {
                        if (indexI == highlight[0] && indexJ == highlight[1]) {
                            return (
                                <Table.Cell className="highlight">
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                        if (indexI == highlight[0]) {
                            return (
                                <Table.Cell className="highlightened">
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                        if (indexJ == highlight[1]) {
                            return (
                                <Table.Cell className="highlightened">
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                    }
                    return <Table.Cell>{String.fromCharCode(j)}</Table.Cell>;
                })}
            </Table.Row>
        );
    });

    // Tests whether the given character code is an Latin uppercase letter.
    const isUppercase = (c) => {
        return 65 <= c && c <= 90; // 65 is character code for 'A'. 90 is 'Z'.
    };

    // Tests whether the given character code is a Latin lowercase letter.
    const isLowercase = (c) => {
        return 97 <= c && c <= 122; // 97 is character code for 'a'. 122 is 'z'.
    };

    const filterKey = (key) => {
        var result = [];
        for (var i = 0; i < key.length; i++) {
            var c = key.charCodeAt(i);
            if (isUppercase(c) || isLowercase(c)) result.push((c - 65) % 32);
        }
        return result;
    };

    const decrypt = () => {
        var newKey = filterKey(key);
        for (var i = 0; i < newKey.length; i++)
            newKey[i] = (26 - newKey[i]) % 26;

        algorithm(ciphertext, newKey, setPlaintext);
    };

    const encrypt = () => {
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
        <div className="vigenere">
            <div className="row">
                <Input
                    className="textInput"
                    placeholder="Plaintext"
                    iconPosition="left"
                    icon="font"
                    value={plaintext}
                    onChange={(event) => {
                        setPlaintext(event.target.value);
                    }}
                ></Input>
                <div className="column expand">
                    <Input
                        iconPosition="left"
                        icon="key"
                        placeholder="Key"
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
                    }}
                ></Input>
            </div>
            <Table definition compact textAlign="center" className="table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        {headerCells}
                    </Table.Row>
                </Table.Header>

                <Table.Body>{rowCells}</Table.Body>
            </Table>
        </div>
    );
};

export default Vigenere;
