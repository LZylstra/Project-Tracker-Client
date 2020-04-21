import React from 'react'
import App from '../App/App'

import { useHistory } from 'react-router-dom'

const Root = () => {
    const history = useHistory()

    return (
        <App history={history}/>
    )
}

export default Root