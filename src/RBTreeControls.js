import React, { useContext } from 'react';
import { Pane, Button } from 'evergreen-ui'
import { ReadyState } from 'react-use-websocket'

import { AppStateContext } from './AppStateProvider'

export default function RBTreeControls(props) {
    const {
        graph,
    } = useContext(AppStateContext)

    function sendRequest(type) {
        if (props.readyState !== ReadyState.OPEN) { return }

        let msg
        if (!graph || graph.type !== 'red-black tree') {
            msg = {
                structure: 'red-black tree',
                action: 'New'
            }
        } else {
            switch (type) {
                case 'ADD_NODE':
                    msg = {
                        structure: 'red-black tree',
                        action: 'Insert'
                    }
                    break
                case 'REMOVE_NODE':
                    msg = {
                        structure: 'red-black tree',
                        action: 'DeleteOneChild'
                    }
                    break
                default:
                    return
            }
        }

        props.sendMessage(JSON.stringify(msg))
    }

    return (
        <Pane alignItems="center" justifyContent="center">
            <Button
                marginTop={50}
                marginRight={25}
                appearance="primary"
                intent="default"
                onClick={() => sendRequest('ADD_NODE') }
            >
                Add node
            </Button>
            <Button
                marginTop={50}
                appearance="default"
                intent="default"
                onClick={() => sendRequest('REMOVE_NODE') }
            >
                Remove node
            </Button>
        </Pane>
    )
}
RBTreeControls.defaultProps = {
    sendMessage: undefined,
    readyState: ReadyState.UNINSTANTIATED,
}
