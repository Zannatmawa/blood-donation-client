import React from 'react'
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hooks/useRole';

const Funding = () => {
    const { role } = useRole();
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const { refetch, data: allFunding = [] } = useQuery({
        queryKey: ['funding', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/save-funding`);
            return res.data;
        }
    })
    console.log(allFunding)

    const handleGiveFund = async () => {
        const paymentInfo = {
            amount: 500,
            donorEmail: user?.email,
        };

        const res = await axiosSecure.post(
            "/create-checkout-session",
            paymentInfo
        );

        window.location.href = res.data.url;
    };

    return (
        <>
            <div>
                <button onClick={handleGiveFund} className="border mt-3 bg-red-600 text-white mx-4 px-6 py-3 rounded-md font-semibold">give fund</button>
            </div>
            {user.email ? <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Fund amount</th>
                            <th>Funding date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {allFunding.map(funding =>
                            <tr>
                                <th>{funding.name}</th>
                                <th>{funding.amount}</th>
                                <td>
                                    {new Date(funding.date).toISOString().slice(0, 10)}
                                </td>
                            </tr>)}

                    </tbody>
                </table>
            </div> : <p></p>}

        </>

    )
}

export default Funding