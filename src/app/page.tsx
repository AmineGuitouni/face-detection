"use client";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { toast } from "react-toastify";
import { AddUser } from "@/actions/image.actions";

export default function Dashboard() {
  // Mock user data
  const [users, setUsers] = useState<{id:number, firstName:string, lastName:string, image:string | null}[]>([
  ]);

  const [newUser, setNewUser] = useState<{firstName:string, lastName:string, image:string | null}>({ firstName: "", lastName: "", image: null });

  // Add user
  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newUser.firstName && newUser.lastName && newUser.image) {
      // setUsers([...users, { id: users.length + 1, ...newUser }]);
      // setNewUser({ name: "", email: "", image: null });
      
      AddUser(newUser).then((data:any)=>{
        console.log(data.request);
        toast.success("User added successfully!");
      })
      .catch((error:any)=>{
        console.log(error);
        toast.error("Error adding user!", error);
      })
    } else {
      toast.error("All fields are required!");
    }
  };

  // Delete user
  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Add User Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Add User</h2>
          <form onSubmit={(e)=>{addUser(e)}} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
              newUser.image ? <div className="flex justify-center items-center p-4 border rounded-md">
                <Image src={newUser.image} alt="image" width={100} height={100}/>
              </div> : null
            }
            <label className="w-full p-4 flex justify-center items-center shadow-sm rounded-md hover:bg-gray-50 transition-all duration-200 cursor-pointer border">
              <CiImageOn size={34} />
              <span className="ml-2 font-semibold">Add Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e)=>{
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setNewUser({ ...newUser, image: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
          </form>
        </div>

        {/* User List Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 pb-2 text-left">ID</th>
                <th className="border-b-2 pb-2 text-left">Name</th>
                <th className="border-b-2 pb-2 text-left">Email</th>
                <th className="border-b-2 pb-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2">{user.firstName}</td>
                  <td className="py-2">{user.lastName}</td>
                  <td className="py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
