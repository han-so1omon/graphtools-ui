import React, { useContext, useEffect } from 'react';
import useWebSocket from 'react-use-websocket'
import { Pane, Heading, GitRepoIcon } from 'evergreen-ui'

import Graph from './Graph'
import Controls from './Controls'
import { AppDispatchContext } from './AppStateProvider'

function App() {
    // Set graph backend url
    let graphBackendUrl = 'ws://localhost:8900/'

    const dispatch = useContext(AppDispatchContext)

    // TODO move websocket stuff to App.js and pass sendMessage as a prop to Controls.js
    // Setup websocket connection
    const { sendMessage, lastMessage, readyState, } = useWebSocket(graphBackendUrl)

    useEffect(() => {
        if (lastMessage && lastMessage.data.type !== "error") {
            dispatch({type: 'SET_GRAPH', payload: JSON.parse(lastMessage.data)})
        } else if (lastMessage && lastMessage.data.type === "error") {
            console.log(lastMessage)
            //TODO handle error
        }
    }, [dispatch, lastMessage])

    return (
      <div>
          <Pane elevation={4} display="flex" margin={5} padding={16} background="overlay">
              <Pane flex={1} alignItems="center" display="flex">
                  <Heading size={600}>graphtools</Heading>
              </Pane>
              <Pane>
                  <a href="https://github.com/han-so1omon/graphtools">
                      <GitRepoIcon color="info" marginRight={16}/>
                  </a>
              </Pane>
          </Pane>
          <Pane display="flex">
              <Graph />
          </Pane>
              <Pane elevation={1} display="flex" margin={5} padding={16} background="orangeTint">
                  <Controls sendMessage={sendMessage} readyState={readyState}/>
              </Pane>
        </div>
    );
}

export default App;
