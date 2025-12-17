import React from 'react'

const Funding = () => {
    return (
        <>
            <div>
                <button className="border mt-3 bg-red-600 text-white mx-4 px-6 py-3 rounded-md font-semibold">give fund</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Fund amount</th>
                            <th>Funding date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Funding