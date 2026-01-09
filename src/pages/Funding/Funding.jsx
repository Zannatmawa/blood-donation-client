import React from 'react'
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hooks/useRole';
import useTitle from '../../components/UseTitle';

const Funding = () => {
    useTitle("Fundings");
    const { role } = useRole();
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const { data: allFunding = [] } = useQuery({
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
        <div>
            <div className='flex justify-between items-center m-10'>
                <h2 className=' text-center text-3xl font-bold text-red-600'>Funding</h2>
                <button onClick={handleGiveFund} className="border bg-red-600 text-white mx-4 px-6 py-3 rounded-md font-semibold">give fund</button>
            </div>
            {user.email ? <div className="overflow-x-auto my-10">
                <table className="table w-full table-zebra mx-5 rounded-xl border border-[#D32F2F]/20 bg-white shadow-lg">
                    <thead className="bg-[#D32F2F] text-white">
                        <tr>
                            <th className="rounded-tl-xl">Name</th>
                            <th>Fund Amount</th>
                            <th className="rounded-tr-xl">Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allFunding.map(funding => (
                            <tr key={funding._id} className="hover:bg-[#FFF1F1] transition">
                                <td className="font-semibold text-gray-800">{funding.name}</td>
                                <td>
                                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#D32F2F]/10 text-[#D32F2F]">
                                        ৳ {funding.amount}
                                    </span>
                                </td>
                                <td className="text-gray-600">
                                    {new Date(funding.date).toISOString().slice(0, 10)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div> : <p></p>}

        </div>

    )
}

export default Funding