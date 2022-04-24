import { Table } from "semantic-ui-react";
import { React, Component, useState } from "react";

const range = (start, stop, step = 1) => {
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );
};

const GraphVis = (props) => {
    //const [highlight, setHighlight] = useState([-1, -1]);

    var charCodes = range(65, 90);

    const moveToEnd = (arr, x) => {
        let n = arr.length;
        x = x % n;

        let first_x_elements = arr.slice(0, x);

        let remaining_elements = arr.slice(x, n);
        arr = [...remaining_elements, ...first_x_elements];

        return arr;
    };

    const genRandomKey = () => {
        return Math.floor(Math.random() * 10000000 + 1);
    };
    var headerCells = charCodes.map(function (i) {
        return (
            <Table.HeaderCell key={genRandomKey()}>
                {String.fromCharCode(i)}
            </Table.HeaderCell>
        );
    });

    var rowCells = charCodes.map(function (i, indexI) {
        return (
            <Table.Row key={genRandomKey()}>
                <Table.Cell key={genRandomKey()}>
                    {String.fromCharCode(i)}
                </Table.Cell>
                {moveToEnd(charCodes, i - 65).map(function (j, indexJ) {
                    if (props.highlight[0] > 0 && props.highlight[1] > 0) {
                        if (
                            indexI === props.highlight[0] &&
                            indexJ === props.highlight[1]
                        ) {
                            return (
                                <Table.Cell
                                    key={genRandomKey()}
                                    className="highlight"
                                >
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                        if (indexI === props.highlight[0]) {
                            return (
                                <Table.Cell
                                    key={genRandomKey()}
                                    className="highlightened"
                                >
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                        if (indexJ === props.highlight[1]) {
                            return (
                                <Table.Cell
                                    key={genRandomKey()}
                                    className="highlightened"
                                >
                                    {String.fromCharCode(j)}
                                </Table.Cell>
                            );
                        }
                    }
                    return (
                        <Table.Cell key={genRandomKey()}>
                            {String.fromCharCode(j)}
                        </Table.Cell>
                    );
                })}
            </Table.Row>
        );
    });

    return (
        <Table definition compact textAlign="center" className="table">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    {headerCells}
                </Table.Row>
            </Table.Header>

            <Table.Body>{rowCells}</Table.Body>
        </Table>
    );
};

export default GraphVis;
