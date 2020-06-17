import React from 'react';
import Konva from 'konva'
import { Circle } from 'react-konva'

export default function GraphNode(props) {
    return (
        <Circle x={props.x} y={props.y} radius={10} fill={props.color} />
    )
}

GraphNode.defaultProps = {
    description: undefined,
}
