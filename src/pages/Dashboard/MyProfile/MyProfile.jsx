import { useForm } from 'react-hook-form'
import useAuth from '../../../hooks/useAuth'
import useAxios from '../../../hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import Notiflix from 'notiflix'

const MyProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user, updateUserProfile } = useAuth()
    const axiosSecure = useAxios()
    const allDistricts = useLoaderData()

    const districts = allDistricts[0].data
    const [districtId, setDistrictId] = useState('')
    const [upazillas, setUpazillas] = useState([])
    const [isEditing, setIsEditing] = useState(false)

    const { refetch, data: allUsers = [] } = useQuery({
        queryKey: ['userProfile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users')
            return res.data
        },
        enabled: !!user?.email
    })

    const dbUser = allUsers.find(u => u.email === user?.email)

    useEffect(() => {
        fetch('/upazilla.json')
            .then(res => res.json())
            .then(data => setUpazillas(data[0].data))
    }, [])

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

    const handleEditProfile = () => {
        setIsEditing(true)
        reset({
            name: user?.displayName || '',
            email: user?.email || '',
            blood: dbUser?.bloodGroup || '',
            district: dbUser?.district || '',
            upazilla: dbUser?.upazilla || ''
        })
        setDistrictId(dbUser?.district || '')
    }

    const safeValue = (newV, oldV) =>
        newV !== undefined && newV !== "" ? newV : oldV

    const handleUpdateProfile = async (data) => {
        console.log(data)
        try {
            let photoURL = user?.photoURL

            if (data.photo && data.photo.length > 0) {
                const formData = new FormData()
                formData.append("image", data.photo[0])

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
                    { method: "POST", body: formData }
                )
                const imgData = await res.json()
                photoURL = imgData.data.url
            }

            const updatedUser = {
                name: safeValue(data.name, dbUser.name),
                photoURL: safeValue(photoURL, dbUser.photoURL),
                bloodGroup: safeValue(data.blood, dbUser.bloodGroup),
                district: safeValue(data.district, dbUser.district),
                upazilla: safeValue(data.upazilla, dbUser.upazilla)
            }

            await updateUserProfile({
                displayName: updatedUser.name,
                photoURL: updatedUser.photoURL
            })

            const res = await axiosSecure.patch(
                `/all-users/${user.email}`,
                updatedUser
            )

            if (res.data.modifiedCount > 0) {
                Notiflix.Notify.success("Profile updated successfully")
                setIsEditing(false)
                refetch()
            }
        } catch {
            Notiflix.Notify.failure("Failed to update profile")
        }
    }


    return (
        <div className="max-w-3xl mx-auto p-6 shadow rounded bg-white">
            <button onClick={handleEditProfile} className="btn btn-primary text-black">
                Edit
            </button>

            <h2 className="text-4xl font-bold text-center mb-6">My Profile</h2>

            <div className="flex justify-center mb-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/Y2q5FJr/default-avatar.png"}
                    className="w-24 h-24 rounded-full border"
                />
            </div>

            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6">
                <input
                    type="text"
                    disabled={!isEditing}
                    {...register('name')}
                    className="input w-full"
                />

                <input
                    type="email"
                    readOnly
                    {...register('email')}
                    className="input w-full"
                />

                <input
                    type="file"
                    disabled={!isEditing}
                    {...register('photo')}
                    className="file-input w-full"
                />

                <select disabled={!isEditing} {...register('blood')} className="select w-full">
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>

                <select
                    disabled={!isEditing}
                    {...register('district')}
                    onChange={e => setDistrictId(e.target.value)}
                    className="select w-full"
                >
                    <option value="">Pick a District</option>
                    {districts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                <select disabled={!isEditing} {...register('upazilla')} className="select w-full">
                    <option value="">Pick a Upazilla</option>
                    {upazillas
                        .filter(u => u.district_id == districtId)
                        .map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                </select>

                {isEditing && (
                    <button type="submit" className="btn bg-green-600 text-black">
                        Save
                    </button>
                )}
            </form>
        </div>
    )
}

export default MyProfile
