import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ScoreItem } from './ScoreItem';

export const Scores = () => {
    const [scores, setScores] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        score: 0
    })
    const {name, score} = formData;
    useEffect(() => {
        axios.get('/api/scores').then(res => setScores(res.data.sort((a,b) => b.score - a.score)) )        
    }, []);

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onChangeSelect = e => {
        switch(e.target.value){
            case "low":
                let low = [...scores].sort((a,b) => a.score - b.score)
                return setScores(low);
            case "high":
                let high = [...scores].sort((a,b) => b.score - a.score)
                return setScores(high);
            default:
                return setScores(scores)
        }
    }

    const addScore = e => {
        e.preventDefault();
        let newScore = {name, score};
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/api/scores', JSON.stringify(newScore), config).then(res => setScores([...scores, res.data].sort((a,b) => b.score - a.score)))
        
    }

    return (
        <div className="container">
            <div className="sort-opt">
                <p>Sort by: </p>
                <select onChange={e => onChangeSelect(e)} className="form-control form-control-select">
                    <option value="high">High - Low</option>
                    <option value="low">Low - High</option>
                </select>
            </div>
            <div className="list">{scores.map(score => <ScoreItem key={score.id} score={score}/>)}</div>
            <div className="score-form">
                <div className="form-inputs">
                    <input placeholder="Name of player..." name="name" defaultValue={name} onChange={e => onChange(e)} className="form-control"/>            
                    <input name="score" defaultValue={score} onChange={e => onChange(e)} className="form-control"/>
                </div>
                <button onClick={e => addScore(e)} className="btn btn-positive">Add a new score</button>
            </div>
        </div>
    )
}
