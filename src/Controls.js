import React, { useState, useContext } from 'react';
import { Pane, Combobox } from 'evergreen-ui'
import { ReadyState } from 'react-use-websocket'

import GenericGraphControls from './GenericGraphControls'
import RBTreeControls from './RBTreeControls'
import { AppStateContext, AppDispatchContext } from './AppStateProvider'

export default function Controls(props) {
    const [graphType, setGraphType] = useState('generic')
    let graphControls
    if (graphType === 'generic') {
        graphControls = <GenericGraphControls
                            readyState={props.readyState}
                            sendMessage={props.sendMessage}
                        />
    } else if (graphType === 'red-black tree') {
        graphControls = <RBTreeControls
                            readyState={props.readyState}
                            sendMessage={props.sendMessage}
                        />
    }
    return (
        <div>
            <Pane margin={5} display="flex" flexDirection="column" float="left">
                <Combobox
                    items={['generic', 'red-black tree']}
                    onChange={selected => setGraphType(selected)}
                    placeholder="random graph"
                    autocompleteProps={{
                        title: 'graph type'
                    }}
                />
            </Pane>
            { graphControls } 
        </div>
    )
}
Controls.defaultProps = {
    sendMessage: undefined,
    readyState: ReadyState.UNINSTANTIATED,
}
