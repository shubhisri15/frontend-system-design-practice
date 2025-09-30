import { useState } from "react";

export default function EventModal ({ event, onSave, onClose }) {

    const [title, setTitle] = useState(event?.title || "");
    const [type, setType] = useState(event?.type || "TASK");
    const [start, setStart] = useState(event?.start || Date.now());
    const [end, setEnd] = useState(event?.end || Date.now() + 3600000);

    const handleSave = () => onSave({ ...event, title, type, start, end });

    return (
        <div className='modal'>
            <label>Event Name</label>
            <input placeholder='Event name' type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="TASK">TASK</option>
                <option value="HOLIDAY">HOLIDAY</option>
            </select>
            <label>Event Duration</label>
            <label>Start:   <input type="datetime-local" value={new Date(start).toISOString().slice(0,16)} onChange={(e) => setStart(new Date(e.target.value).getTime())}/></label>
            <label>End:   <input type="datetime-local" value={new Date(end).toISOString().slice(0,16)} onChange={(e) => setEnd(new Date(e.target.value).getTime())}/></label>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}