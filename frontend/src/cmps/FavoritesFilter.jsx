import React, { useState } from 'react'

export function FavoritesFilter({ onFilterList }) {
    const [filter, setFilter] = useState({ name: '' })

    const handleChange = (ev) => {
        const value = ev.target.value
        filter.name = value
        setFilter(filter)
        onFilterList(filter)
    }

    return (
        <div className="filter">
            <input type="text" placeholder="Search Video" onChange={(ev) => handleChange(ev)} />
        </div>
    )
}
