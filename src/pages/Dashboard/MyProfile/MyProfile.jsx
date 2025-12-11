import React, { use } from 'react'
import { useForm, useWatch } from 'react-hook-form'
// import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
// import useAxios from '../../hooks/useAxios';

const MyProfile = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    // // const axios = useAxios();
    const { user } = useAuth();
    // // const navigate = useNavigate();
    // console.log(user)
    // const serviceCenters = useLoaderData();
    // const regionsDuplicate = serviceCenters.map(c => c.region);
    // const regions = [...new Set(regionsDuplicate)];
    // //call useMemo useCallBack
    // const senderRegion = useWatch({ control, name: 'senderRegion' })
    // const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    // const districtByRegion = region => {
    //     const regionDistricts = serviceCenters.filter(c => c.region === region);
    //     const districts = regionDistricts.map(d => d.district);
    //     return districts;
    // }


    return (
        <div>
            <h2 className='text-5xl font-bold'>Send A Parcel</h2>
            <form onSubmit={handleSubmit()}
                className='mt-12 p-4'>
                {/* parcel type */}
                <div>
                    <label className='label'><input
                        type='radio'
                        {...register('parcelType')}
                        value="document"
                        name="radio-1"
                        className='radio'
                        defaultChecked />Document
                    </label>
                    <label className='label'><input
                        type='radio'
                        {...register('parcelType')}
                        value="non-document"
                        name="radio-1"
                        className='radio'
                        defaultChecked />Non-Document
                    </label>
                </div>
                {/* parcel */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel name</label>
                        <input type="text" {...register('parcelName')}
                            className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel weight(kg)</label>
                        <input type="number" {...register('parcelWeight')}
                            className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* two col */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Sender */}
                    <fieldset className="fieldset">
                        <h4 className='text-2xl font-semibold'>Sender Details</h4>
                        <label className="label">Sender name</label>
                        <input type="text"
                            {...register('senderName')}
                            defaultValue={user?.displayName}
                            className="input w-full" placeholder="Sender name" />
                        {/* email */}
                        <label className="label">Sender Email</label>
                        <input type="text"
                            {...register('senderEmail')}
                            defaultValue={user?.email}
                            className="input w-full" placeholder="Sender Email" />
                        {/* options */}
                        {/* sender regions */}
                        {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select a Region</legend>
                            <select {...register('senderRegion')} defaultValue="Pick a browser" className="select">
                                <option disabled={true}>Pick a region</option>
                                {regions.map((region, i) => <option key={i} value={region}>{region}</option>)}
                            </select>
                            <span className="label">Optional</span>
                        </fieldset> */}
                        {/* sender districts */}
                        {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select a District </legend>
                            <select {...register('senderDistrict')} defaultValue="Pick a browser" className="select">
                                <option disabled={true}>Pick a District</option>
                                {districtByRegion(senderRegion).map((region, i) => <option key={i} value={region}>{region}</option>)}

                            </select>
                            <span className="label">Optional</span>
                        </fieldset> */}
                        {/* address */}
                        <label className="label mt-4">Sender Address</label>
                        <input type="text" {...register('senderAddress')}
                            className="input w-full" placeholder="Sender Address" />
                        {/* district */}
                        <label className="label mt-4">Sender District</label>
                        <input type="text" {...register('senderDistrict')}
                            className="input w-full" placeholder="Sender District" />
                    </fieldset>
                    {/* receiver */}
                    <fieldset className="fieldset">
                        <h4 className='text-2xl font-semibold'>Receiver Details</h4>
                        <label className="label">Receiver name</label>
                        <input type="text" {...register('receiverName')}
                            className="input w-full" placeholder="Receiver name" />
                        {/* email */}
                        <label className="label">Receiver Email</label>
                        <input type="text" {...register('receiverEmail')}
                            className="input w-full" placeholder="Receiver Email" />
                        {/* Receiver regions */}
                        {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select a Region</legend>
                            <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {regions.map((region, i) => <option key={i} value={region}>{region}</option>)}
                            </select>
                        </fieldset> */}
                        {/* Receiver disctrics  */}
                        {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">Select a District</legend>
                            <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select">
                                <option disabled={true}>Pick a region</option>
                                {districtByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </fieldset> */}
                        {/* address */}
                        <label className="label mt-4">Receiver Address</label>
                        <input type="text" {...register('receiverAddress')}
                            className="input w-full" placeholder="Receiver Address" />

                    </fieldset>
                </div>
                <button type='submit' className='btn btn-primary text-black' value="Send Parcel" >Submit</button>
            </form>
        </div>
    )
}

export default MyProfile