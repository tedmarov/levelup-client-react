import React, { useState } from "react"

export const EventContext = React.createContext()

export const EventProvider = (props) => {
    const [ events, setEvents ] = useState([])
    const [ games, setGames ] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8000/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setEvents)
    }

    const createEvent = (event) => {
        return fetch("http://127.0.0.1.:8000/events", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const leaveEvent = eventId => {
        return fetch(`http://localhost:8000/events/${eventId}/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(getEvents)
    }
    
    const joinEvent = event => {
        return fetch(`http://localhost:8000/events/${event.id}/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(event)
        })
            .then(response => response.json())
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={{ events, getEvents, createEvent, games, getGames, joinEvent, leaveEvent }} >
            { props.children }
        </EventContext.Provider>
    )
}