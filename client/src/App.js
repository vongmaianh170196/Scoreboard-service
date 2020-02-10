import React, {Fragment} from 'react'
import { Scores } from './components/Scores'

export const App = () => {
  return(
        <Fragment>
          <div className="title">
            <h3>Scoreboard</h3>
          </div>
          <Scores/>
        </Fragment>
  )
}
