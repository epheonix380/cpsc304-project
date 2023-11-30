import React, { useEffect, useState } from "react";

export default function User() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
            fetch(`${process.env.REACT_APP_URL}/user/1`).then(
                (response) => {
                    response.json().then(
                        (jsonResponse) => {
                            const data = jsonResponse.data;
                            setUser(data);
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

    const name = user[0].customername;
    const city = user[0].city;
    const password = user[0].password;
    const userid = user[0].userid;

    if (isLoading) {
        return <div className="maincontent">Loading...</div>;
    }

    if (isError) {
        return <div className="maincontent">Error: {isError}</div>;
    }

    return (
        <div>
            <h1>
                Welcome, {name}!
            </h1>
        </div>
        // <div>
        //     <a href="/">Home</a>
        //     <div>
        //         <InputLabel id="table-names">Table Name</InputLabel>
        //         <Select
        //         labelId="table-names"
        //         id="table-names"
        //         value={table}
        //         onChange={handleTableName}
        //         >
        //             {tableNameItems}
        //         </Select>
        //         <Select
        //         labelId="table-attributes"
        //         id="table-attributes"
        //         value={attributes}
        //         multiple
        //         renderValue={(selected) => selected.join(', ')}
        //         onChange={handleTableAttribute}
        //         >
        //             {tableAttributeItems}
        //         </Select>
        //     </div>
        //     <div>
        //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //             <TableHead>
        //             <TableRow>
        //                 {attributes.map((value)=>{
        //                     return <TableCell>{value}</TableCell>
        //                 })}
        //             </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {tableData.map((row)=>{
        //                     return (
        //                         <TableRow>
        //                             {Object.values(row).map((cell)=>{
        //                                 return (
        //                                     <TableCell>{cell}</TableCell>
        //                                 )
        //                             })}
        //                         </TableRow>
        //                     )
        //                 })}
        //             </TableBody>
        //         </Table>
        //     </div>
        // </div>
    )
}