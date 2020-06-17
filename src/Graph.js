import React, { useContext, useEffect, useState } from 'react';
import Konva from 'konva'
import { Stage, Layer } from 'react-konva'

import GraphNode from './GraphNode'
import GraphEdge from './GraphEdge'
import { AppStateContext } from './AppStateProvider'
import { GraphSpec } from './graph-spec'
import useWindowDimensions from './window-dimensions'

export default function Graph() {
    const {
        showPopupInfo,
        graph,
    } = useContext(AppStateContext)

    // Setup arrays of node and edge components
    const [graphComponents, setGraphComponents] = useState({ nodes: [], edges: [] })

    const { windowWidth, windowHeight } = useWindowDimensions()
    const [ stageDims, setStageDims ] = useState(
        { width: windowWidth, height: windowHeight/1.4, offsetRatio: 0.2 }
    )

    function fitGraph(nodesAndEdges) {
        let fitNodesAndEdges = { nodes: [], edges: []}
        // Find coordinate bounds
        let minX=0, minY=0, minZ=0, maxX=0, maxY=0, maxZ=0
        for ( let i=0; i<nodesAndEdges.nodes.length; i++ ) {
            let node = nodesAndEdges.nodes[i]
            if (node.x < minX) { minX = node.x }
            if (node.y < minY) { minY = node.y }
            if (node.z < minZ) { minZ = node.z }

            if (node.x > maxX) { maxX = node.x }
            if (node.y > maxY) { maxY = node.y }
            if (node.z > maxZ) { maxZ = node.z }
        }

        // Offset to pad stage
        let widthOffset = windowWidth*stageDims.offsetRatio/2
        let heightOffset = windowHeight*stageDims.offsetRatio/2
        let stagePaddingRatio = 1-stageDims.offsetRatio

        // Get dimensions in initial graph coordinate system
        let unfitWidth = maxX-minX
        if (unfitWidth === 0) { unfitWidth = 1 }
        let unfitHeight = maxY-minY
        if (unfitHeight === 0) { unfitHeight = 1 }

        // Do bi-linear mapping on nodes
        for ( let i=0; i<nodesAndEdges.nodes.length; i++ ) {
            let node = nodesAndEdges.nodes[i]
            fitNodesAndEdges.nodes.push({
                id: node.id,
                x: widthOffset + ((node.x-minX)/unfitWidth)*stageDims.width*stagePaddingRatio,
                y: heightOffset + ((node.y-minY)/unfitHeight)*stageDims.height*stagePaddingRatio,
                color: node.color,
            })
        }

        // Do bi-linear mapping on edges
        for ( let i=0; i<nodesAndEdges.edges.length; i++ ) {
            let edge = nodesAndEdges.edges[i]
            fitNodesAndEdges.edges.push({
                id: edge.id,
                x1: widthOffset + ((edge.x1-minX)/unfitWidth)*stageDims.width*stagePaddingRatio,
                y1: heightOffset + ((edge.y1-minY)/unfitHeight)*stageDims.height*stagePaddingRatio,
                x2: widthOffset + ((edge.x2-minX)/unfitWidth)*stageDims.width*stagePaddingRatio,
                y2: heightOffset + ((edge.y2-minY)/unfitHeight)*stageDims.height*stagePaddingRatio,
            })
        }

        return fitNodesAndEdges
    }

    function getNodesAndEdges(graph) {
        let nodesAndEdges = { nodes: [], edges: [] }
        let tmpNodeMap = {}
        if (!graph) { return nodesAndEdges }

        // Push nodes into array
        for ( let i=0; i<graph.nodes.length; i++ ) {
            let node = graph.nodes[i]
            let color = GraphSpec.colors[node.extra.color]
            if ( color === null || color === undefined ) { color = "pink" }
            nodesAndEdges.nodes.push({
                id: node.id,
                x: node.coords.x,
                y: node.coords.y,
                z: node.coords.z,
                color: color,
            })
            // Setup temporary node map for reference when setting edge array
            tmpNodeMap[node.id] = { x: node.coords.x, y: node.coords.y, z: node.coords.z }
        }

        // Push edges into array
        let edgeCount = 0
        for ( let i=0; i<graph.nodes.length; i++ ) {
            let node = graph.nodes[i]
            for ( let j=0; j<node.edges.length; j++ ) {
                let edge = node.edges[j]
                nodesAndEdges.edges.push({
                    id: edgeCount,
                    x1: node.coords.x,
                    y1: node.coords.y,
                    z1: node.coords.z,
                    x2: tmpNodeMap[edge.noderepr[1].id].x,
                    y2: tmpNodeMap[edge.noderepr[1].id].y,
                    z2: tmpNodeMap[edge.noderepr[1].id].z,
                })
                edgeCount++
            }
        }

        return nodesAndEdges
    }

    // Set new stage dimensions if window dimensions change
    useEffect(() => {
        setStageDims({ width: windowWidth, height: windowHeight/1.4, offsetRatio: 0.2 })
    }, [windowWidth, windowHeight])

    // Refit graph to stage if stage dimensions change
    useEffect(() => {
        setGraphComponents(g => fitGraph(g))
    }, [stageDims])

    // Set new graph components if graph changes
    useEffect(() => {
        if (graph) {
            setGraphComponents(fitGraph(getNodesAndEdges(graph.graph)))
        }
    }, [graph])

            /*
            newNodeComponents.push(
                <GraphNode id={1} x={400} y={100} color="blue"/>,
                <GraphNode id={2} x={300} y={200} color="blue"/>,
                <GraphNode id={3} x={500} y={200} color="blue"/>,
                <GraphNode id={4} x={200} y={300} color="blue"/>,
                <GraphNode id={5} x={400} y={300} color="blue"/>,
                <GraphNode id={6} x={600} y={300} color="blue"/>,
                <GraphNode id={7} x={100} y={400} color="blue"/>,
                <GraphNode id={8} x={300} y={400} color="blue"/>,
            )
            newEdgeComponents.push(
                <GraphEdge id={1} x1={400} y1={100} x2={300} y2={200}/>,
                <GraphEdge id={2} x1={400} y1={100} x2={500} y2={200}/>,
                <GraphEdge id={3} x1={300} y1={200} x2={200} y2={300}/>,
                <GraphEdge id={4} x1={500} y1={200} x2={400} y2={300}/>,
                <GraphEdge id={5} x1={500} y1={200} x2={600} y2={300}/>,
                <GraphEdge id={6} x1={200} y1={300} x2={100} y2={400}/>,
                <GraphEdge id={7} x1={200} y1={300} x2={300} y2={400}/>,
            )
            */

    // TODO handle showPopupInfo
    return (
        <Stage width={stageDims.width} height={stageDims.height}>
            <Layer>
                {
                    !showPopupInfo &&
                    graphComponents.nodes.map(
                        n => <GraphNode
                                key={n.id}
                                x={n.x}
                                y={n.y}
                                color={n.color}
                            />
                    )
                }
                {
                    !showPopupInfo &&
                    graphComponents.edges.map( 
                        e => <GraphEdge
                                key={e.id}
                                x1={e.x1}
                                y1={e.y1}
                                x2={e.x2}
                                y2={e.y2}
                            />
                    )
                }
            </Layer>
        </Stage>
    )
}
