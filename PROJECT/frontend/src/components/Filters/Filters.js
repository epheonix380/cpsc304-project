import './Filters.css'
import React, {useEffect, useState} from "react";
import {InputNumber, Select, Input} from "antd";

function Filters({filters, setFilters}) {
    // const [filtersArray, setFiltersArray] = useState([{ filterColumn: '', filterValue: ''}]);
    // let filtersArray = [{ filterColumn: '', filterValue: ''}];
    // const [addedFilter, setAddedFilter] = useState(false);
    let defaultAndOrOperator = 'and', defaultFilterColumn = 'Ticket.ticketid', filterValue;
    //
    // const handleApply = () => {
    // //     if (filterValue !== undefined && filterValue >= 0) {
    // //         setFilters(`${filterColumn} = ${filterValue}`);
    // //     } else {
    // //         alert("No negative values allowed! Please input a value.");
    // //     }
    // };
    //
    // const handleInputChange = (index, filterColumn, filterValue) => {
    //     // console.log(index);
    //     const newFilters = [...filtersArray];
    //     newFilters[0] = { filterColumn, filterValue };
    //     // setFiltersArray(newFilters);
    //     console.log(newFilters[0]);
    // };
    //
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

    //
    //     return (
    //         <div>
    //             <Select
    //                 options={andOr}
    //                 // onChange={(value) => andOrOperator = value}
    //                 defaultValue={defaultAndOrOperator}
    //                 bordered={false}
    //             />
    //             <FilterItem/>
    //         </div>
    //     )
    // }

    const [filtersArray, setFiltersArray] = useState([{ andOr: '', col: '', val: '' }]);
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInputChange = (index, andOr, col, val) => {
        const newFiltersArray = [...filtersArray];
        newFiltersArray[index] = { andOr, col, val };
        setFiltersArray(newFiltersArray);
        console.log(newFiltersArray);
    };

    const addFilter = () => {
        setFiltersArray([...filtersArray, { andOr: 'and', col: 'Ticket.ticketID', val: '' }]);
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
    };

    return (
        <div>
            {filtersArray.map((filter, index) => (
                <div key={index}>
                    <Select
                        options={andOr}
                        onChange={(e) => handleInputChange(index, e, filter.col, filter.val)}
                        defaultValue={defaultAndOrOperator}
                        bordered={false}
                    />
                    <Select
                        options={filterColumns}
                        defaultValue={defaultFilterColumn}
                        onChange={(e) => handleInputChange(index, filter.andOr, e, filter.val)}
                    /> is equal to <InputNumber
                    defaultValue={0}
                    onChange={(e) => handleInputChange(index, filter.andOr, filter.col, e)}/>
                    <button type="button" onClick={() => removeFilter(index)}>
                        Remove Filter
                    </button>
                </div>
            ))}
            <button type="button" onClick={addFilter}> Add Filter </button>
            <button onClick={handleApply} className="apply">APPLY</button>
        </div>
        // <div
        //     {filtersArray.map((filter, index) => (
        //         <FilterItem index={index} filterColumn={filter.filterColumn} filterColumn={filter.filterValue}/>
        //     ))}
        //     {/*<FilterItem/>*/}
        //     {addedFilter ? <AddFilterItem/> : <button onClick={handleAddFilter}>ADD A FILTER</button>}
        // </div>
    );
}

export default Filters;