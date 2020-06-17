import React from 'react';
import Konva from 'konva'
import { Line } from 'react-konva'

export default function GraphEdge(props) {
    return (
        <Line
            x={0}
            y={0}
            points={[props.x1,props.y1,props.x2,props.y2]}
            stroke="purple"
        />
    )
}

GraphEdge.defaultProps = {
    description: undefined,
}
