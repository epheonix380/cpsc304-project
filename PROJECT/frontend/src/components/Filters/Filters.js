import './Filters.css'
import React, {useEffect, useState} from "react";
import {InputNumber, Select, Input} from "antd";

function Filters({filters, setFilters}) {
    const [addedFilter, setAddedFilter] = useState(false);
    let andOrOperator = 'and', filterColumn = 'Ticket.ticketid', filterValue;

    const handleApply = () => {
        if (filterValue !== undefined && filterValue >= 0) {
            setFilters(`${filterColumn} = ${filterValue}`);
        } else {
            alert("No negative values allowed! Please input a value.")
        }
    }

    const FilterItem = () => {
        const filterColumns = [
            {value: 'Ticket.ticketid', label: 'Ticket ID'},
            {value: 'cost', label: 'Cost'},
            {value: 'seatnumber', label: 'Seat#'},
            {value: 'rownumber', label: 'Row#'},
            {value: 'sectionnumber', label: 'Section#'}
        ];

        return (
            <div>
                <Select
                    options={filterColumns}
                    onChange={(value) => filterColumn = value}
                    defaultValue={filterColumn}
                /> is equal to <InputNumber defaultValue={-1} onChange={(value) => filterValue = value}/>

            </div>
        )
    }

    const AddFilterItem = () => {
        const andOr = [
            {value: 'and', label: 'and'},
            {value: 'or', label: 'or'},
        ];

        return (
            <div>
                <Select
                    options={andOr}
                    onChange={(value) => andOrOperator = value}
                    defaultValue={andOrOperator}
                    bordered={false}
                />
                <FilterItem/>
            </div>
        )
    }

    const handleAddFilter = () => {
        setAddedFilter(true)
    }

    return (
        <div>
            <FilterItem/>
            {addedFilter ? <AddFilterItem/> : <button onClick={handleAddFilter}>ADD A FILTER</button>}
            <button onClick={handleApply} className="apply">APPLY</button>
        </div>
    );
}

export default Filters;