import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";

const ViewDonationReq = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();

    const { data: donationRequest = [] } = useQuery({
        queryKey: ['allDonationRequest', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-blood-donation-request`);
            return res.data;
        }
    })

    const pendingReq = donationRequest.filter(req => req._id === id);

    const handleDonorInfo = (data) => {
        console.log(data, id)
        axiosSecure.post(`/donor-collections/${id}`, data)
            .then(res =>
                console.log(res)
            )
    }
    return (
        <div className="min-h-screen bg-red-50 py-16 px-4">
            {pendingReq.map(req => <div key={req._id} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Blood Donation Request
                    </h1>
                    <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full font-bold">
                        {req.bloodGroup}
                    </span>
                </div>

                {/* Info Section */}
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">

                    <div>
                        <p className="font-semibold">Recipient Name</p>
                        <p>{req.recipientName}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Hospital</p>
                        <p>{req.hospitalName}</p>
                    </div>

                    <div>
                        <p className="font-semibold">District</p>
                        <p>{req.recipientDistrict}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Upazilla</p>
                        <p>{req.recipientUpazilla}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Required Date</p>
                        <p>{req.donationDate}</p>
                    </div>

                    <div>
                        <p className="font-semibold">Status</p>
                        <p
                            className={`font-semibold ${req.status === "pending"
                                ? "text-yellow-600"
                                : req.status === "inprogress"
                                    ? "text-green-600"
                                    : "text-gray-600"
                                }`}
                        >
                            {req.status}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className="border mt-10 border-red-600 text-red-600 px-6 py-3 rounded-md font-semibold" onClick={() => document.getElementById('my_modal_1').showModal()}>donate button</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <form onSubmit={handleSubmit(handleDonorInfo)} method="dialog">
                                <div className="mb-5">
                                    <label className="text-gray-700 font-medium">Donor Name:</label>
                                    <input type="text"
                                        {...register('name')}
                                        defaultValue={user?.displayName}
                                        readOnly placeholder="Donor name"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="text-gray-700 font-medium">Donor Email:</label>
                                    <input type="text"
                                        {...register('email')}
                                        defaultValue={user?.email}
                                        readOnly placeholder="Donor name"
                                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <button type="submit" className="btn">confirm </button>
                                </div>
                            </form>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </div>
                    </dialog>
                    <Link to="/pending-donation-requests" className="border mt-10 border-red-600 text-red-600 px-6 py-3 rounded-md font-semibold">Back</Link>
                </div>
            </div>)}
        </div>
    );
};

export default ViewDonationReq;
