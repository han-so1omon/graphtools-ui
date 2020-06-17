import React, { useState } from 'react';
import { Pane, Dialog, Button, Text, TextInput } from 'evergreen-ui'
import { ReadyState } from 'react-use-websocket'

export default function GenericGraphControls(props) {
    const [state, setState] = useState({ showDialog: false})

    return (
        <Pane alignItems="center" justifyContent="center">
            <Dialog
                isShown={state.showDialog}
                title="Add node"
                onCloseComplete={() => setState({ showDialog: false })}
            >
                <Pane>
                    <Text marginRight={10}>
                        Location
                    </Text>
                    <TextInput
                        name="location"
                        placeholder="x, y, z"
                    />
                </Pane>
                <Pane>
                    <Text marginRight={10}>
                        Edges
                    </Text>
                    <TextInput
                        name="edges"
                        placeholder="n1, n2, n3, n4"
                    />
                </Pane>
            </Dialog>
            <Button
                marginTop={50}
                marginRight={25}
                appearance="primary"
                intent="success"
                onClick={() => setState({ showDialog: true })}
            >
                Add node
            </Button>
        </Pane>
    )
}
GenericGraphControls.defaultProps = {
    sendMessage: undefined,
    readyState: ReadyState.UNINSTANTIATED,
}
