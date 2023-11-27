import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Admin() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tableNames, setTableNames] = useState([]);
    const [table, setTable] = useState("");
    const [tableAttributes, setTableAttributes] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_URL}/tables`).then(
            (response) => {
                response.json().then(
                    (jsonResponse) => {
                        const data = jsonResponse.data;
                        setTableNames(data);
                        setIsLoading(false);
                    }
                ).catch(
                    (err)=>{
                        setIsError(true)
                    }
                )
                
            }
        ).catch(
            (err)=>{
                console.log(err);
                setIsError(true)
            }
        )
          
    }, [])

    useEffect(()=>{
        if (table !== "" && table.length > 0) {
            fetch(`${process.env.REACT_APP_URL}/columns/${table}`).then(
                (response) => {
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            setTableAttributes(data);
                            setIsLoading(false);
                        }
                    ).catch(
                        (err)=>{
                            console.log(err);
                            setIsError(true)
                        }
                    )
                    
                }
            ).catch(
                (err)=>{
                    console.log(err);
                    setIsError(true)
                }
            )
        }
          
    }, [table])

    useEffect(()=>{
        if (table !== "" && table.length > 0 && attributes.length > 0) {
            fetch(`${process.env.REACT_APP_URL}/flex-table`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tablename:table,
                    attributes,
                })
            }).then(
                (response) => {
                    console.log(response)
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            setTableData(data);
                            setIsLoading(false);
                        }
                    ).catch(
                        (err)=>{
                            console.log(err);
                            setIsError(true)
                        }
                    )
                    
                }
            ).catch(
                (err)=>{
                    console.log(err);
                    setIsError(true)
                }
            )
        }
          
    }, [attributes, table])
    

    if (isError) {
        return <h1>An error has occured please try again</h1>
    } else if (isLoading) {
        return <CircularProgress/>
    }

    const handleTableName = (event) => {
        setTable(event.target.value);
        setAttributes([]);
        setTableData([]);
    }

    const handleTableAttribute = (event) => {
        const {
            target: { value },
          } = event;
          setAttributes(
            value
          );
          setTableData([]);
        
    }

    const tableNameItems = [];

    for (let i = 0; i<tableNames.length; i++) {
        tableNameItems.push(
            <MenuItem value={tableNames[i]["name"]}>{tableNames[i]["name"]}</MenuItem>
        )
    }

    const tableAttributeItems = [];

    for (let i = 0; i<tableAttributes.length; i++) {
        const name = tableAttributes[i]["name"]
        tableAttributeItems.push(
            <MenuItem value={name}>
                <Checkbox checked={attributes.indexOf(name) > -1} />
                <ListItemText primary={name} />
            </MenuItem>
        )
    }
    return (
        <div>
            <a href="/">Home</a>
            <div>
                <InputLabel id="table-names">Table Name</InputLabel>
                <Select
                labelId="table-names"
                id="table-names"
                value={table}
                onChange={handleTableName}
                >
                    {tableNameItems}
                </Select>
                <Select
                labelId="table-attributes"
                id="table-attributes"
                value={attributes}
                multiple
                renderValue={(selected) => selected.join(', ')}
                onChange={handleTableAttribute}
                >
                    {tableAttributeItems}
                </Select>
            </div>
            <div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {attributes.map((value)=>{
                            return <TableCell>{value}</TableCell>
                        })}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row)=>{
                            return (
                                <TableRow>
                                    {Object.values(row).map((cell)=>{
                                        return (
                                            <TableCell>{cell}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

}