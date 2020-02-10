import React from 'react'

export const ScoreItem = ({score}) => {
    return (
        <div className="list-item">
            <div className="item-name">
                {score.name}
            </div>
            <div className="item-score">
                {score.score}
            </div>
        </div>
    )
}
