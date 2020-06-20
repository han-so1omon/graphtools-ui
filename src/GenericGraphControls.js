import React, { useState } from 'react';
import { Pane, FilePicker } from 'evergreen-ui'
import { ReadyState } from 'react-use-websocket'

export default function GenericGraphControls(props) {
    const [state, setState] = useState({
        showDialog: false,
        nodeLocation: '',
        nodeEdges: '',
    })

    function resetGraph() {
    }

    function loadGraph(graphFile) {
        var reader = new FileReader()
        reader.readAsText(graphFile)
        reader.onload = function() {
            let msg = {
                structure: 'generic',
                action: 'LoadCSV',
                params: {
                    csvText: reader.result,
                }
            }
            props.sendMessage(JSON.stringify(msg))
        }

    }

    function addNode(loc, edges) {
        console.log(loc, edges)

        /*
        msg = {
            structure: 'red-black tree',
            action: 'Insert'
        }
        */
        //props.sendMessage(JSON.stringify(msg))
    }

    return (
        <Pane alignItems="center" justifyContent="center">
            <FilePicker
                martinTop={100}
                marginRight={25}
                placeholder={"Select a graph file"}
                onChange={(f) => loadGraph(f[0])}
                multiple={false}
            />
        </Pane>
    )
}
GenericGraphControls.defaultProps = {
    sendMessage: undefined,
    readyState: ReadyState.UNINSTANTIATED,
}
