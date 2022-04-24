import { Button, Input } from "semantic-ui-react";

const Controller = (props) => {
    return (
        <div className="row controller">
            <Input
                className="textInput"
                placeholder="Plaintext"
                iconPosition="left"
                icon="font"
                value={props.plaintext}
                onChange={(event) => {
                    props.setPlaintext(event.target.value);
                    props.setCiphertext("");
                }}
            ></Input>
            <div className="column expand">
                <Input
                    iconPosition="left"
                    icon="key"
                    placeholder="Key"
                    value={props.cipherKey}
                    onChange={(event) => {
                        props.setKey(event.target.value);
                    }}
                ></Input>
                <div className="row">
                    <Button
                        className="expand"
                        color="red"
                        inverted
                        onClick={props.encrypt}
                    >
                        Encrypt
                    </Button>
                    <Button
                        className="expand"
                        color="green"
                        inverted
                        onClick={props.decrypt}
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
                value={props.ciphertext}
                onChange={(event) => {
                    props.setCiphertext(event.target.value);
                    props.setPlaintext("");
                }}
            ></Input>
        </div>
    );
};

export default Controller;
