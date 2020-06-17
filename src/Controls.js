import React, { useState, useContext } from 'react';
import { Pane, Combobox, Switch } from 'evergreen-ui'
import { ReadyState } from 'react-use-websocket'

import GenericGraphControls from './GenericGraphControls'
import RBTreeControls from './RBTreeControls'
import { AppStateContext, AppDispatchContext } from './AppStateProvider'

export default function Controls(props) {
    const dispatch = useContext(AppDispatchContext)
    const {
        showPopupInfo,
    } = useContext(AppStateContext)

    const [graphType, setGraphType] = useState('red-black tree')
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
            <Pane margin={10} display="flex" flexDirection="column" float="right">
                <Switch
                    checked={showPopupInfo}
                    onChange={ e => dispatch({ type: 'SET_SHOW_POPUP_INFO', payload: !showPopupInfo }) }
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
