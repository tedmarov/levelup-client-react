import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"



export const EventForm = () => {
    const history = useHistory()
    const { games, createEvent, getGames } = useContext(EventContext)

    const [currentEvent, setCurrentEvent] = useState({
        time: "",
        date: "",
        gameId: 0,
        description: ""
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.title}
                            </option>
                            ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>                            
            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        time: currentEvent.time,
                        date: currentEvent.date,
                        gameId: +(currentEvent.gameId),
                        description: currentEvent.description
                    }

                    // Once event is created, redirect user to event list
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}