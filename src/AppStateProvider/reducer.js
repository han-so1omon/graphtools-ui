export default function (state, { type, payload }) {
    switch (type) {
        case 'SET_SHOW_POPUP_INFO':
            return {
                ...state,
                showPopupInfo: payload,
            }

        case 'SET_GRAPH':
            return {
                ...state,
                graph: payload,
            }

        default:
            return state
    }
}
