import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from 'react-router-dom'
import "./Event.css"

export const EventList = () => {
    const { events, getEvents, leaveEvent, joinEvent } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => history.push("/events/new")}>
                        Schedule New Event
                </button> 
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })
                            }
                            @ {event.date}
                        </div>
                        {
                        event.owner
                            ? "" 
                            :
                            event.joined ? 
                                    <button className="btn btn-3"
                                        onClick={() => leaveEvent(event.id)}>
                                            Leave
                                    </button>
                                        : 
                                    <button className="btn btn-2"
                                        onClick={() => joinEvent(event)}>
                                            Join
                                    </button>
                        }
                    </section>
                })
            }          
        </article >
    )
}