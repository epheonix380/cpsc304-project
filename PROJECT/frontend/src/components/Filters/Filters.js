import './Filters.css'
import React, {useEffect, useState} from "react";
import {InputNumber, Select, Input} from "antd";

function Filters({filters, setFilters}) {
    let defaultAndOrOperator = 'and', defaultFilterColumn = 'Ticket.ticketid';

    const filterColumns = [
        {value: 'Ticket.ticketid', label: 'Ticket ID'},
        {value: 'cost', label: 'Cost'},
        {value: 'seatnumber', label: 'Seat#'},
        {value: 'rownumber', label: 'Row#'},
        {value: 'sectionnumber', label: 'Section#'}
    ];

    const andOr = [
        {value: 'and', label: 'and'},
        {value: 'or', label: 'or'},
    ];

    const [filtersArray, setFiltersArray] = useState([{ andOr: '', col: defaultFilterColumn, val: '0' }]);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInputChange = (index, andOr, col, val) => {
        const newFiltersArray = [...filtersArray];
        newFiltersArray[index] = {andOr, col, val };
        setFiltersArray(newFiltersArray);
    };

    const addFilter = () => {
        setFiltersArray([...filtersArray, { andOr: defaultAndOrOperator, col: defaultFilterColumn, val: '0' }]);
    };

    const removeFilter = (index) => {
        const newFiltersArray = [...filtersArray];
        newFiltersArray.splice(index, 1);
        setFiltersArray(newFiltersArray);
    };

    const handleApply = () => {
        let filtersString = '(';
        filtersArray.forEach((f) => {
            filtersString += `${f.andOr} ${f.col} = ${f.val} `;
        });
        filtersString += ')';
        setFilters(filtersString);
        console.log(filtersString);
    };

    return (
        <div>
            {filtersArray.map((filter, index) => (
                <div key={index}>
                    {index == 0 ? <></> : (
                        <Select
                        options={andOr}
                        onChange={(e) => handleInputChange(index, e, filter.col, filter.val)}
                        defaultValue={defaultAndOrOperator}
                        bordered={false}/>)
                    }
                    <Select
                        options={filterColumns}
                        defaultValue={defaultFilterColumn}
                        onChange={(e) => handleInputChange(index, filter.andOr, e, filter.val)}
                    /> is equal to <InputNumber
                    defaultValue={0}
                    onChange={(e) => handleInputChange(index, filter.andOr, filter.col, e)}/>
                    <button type="button" onClick={() => removeFilter(index)} className="filter">
                        Remove Filter
                    </button>
                </div>
            ))}
            <button type="button" onClick={addFilter}> Add Filter </button>
            <button onClick={handleApply} className="apply">APPLY</button>
        </div>
    );
}

export default Filters;