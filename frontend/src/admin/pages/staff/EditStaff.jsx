import React, { useEffect, useState } from "react";
import { editStaff, viewStaff } from "../../../service/staffService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import toast from "react-hot-toast";

const EditStaff = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState();
  const [staff, setStaff] = useState({
    IDnumber: "",
    name: "",
    dateOfBirth: "",
    role: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      setStaff(await viewStaff(id));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async () => {
    console.log(staff);
    try {
      setIsLoading(true);
      if (password) {
        staff.password = password;
      }
      const data = await editStaff(id, staff);
      console.log(data);
      if (data.code === 0) {
        toast.success(data.message);
        nav("/admin/staff");
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else {
      setStaff({
        ...staff,
        [name]: value,
      });
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formattedDateOfBirth = staff.dateOfBirth
    ? formatDate(staff.dateOfBirth)
    : "";
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
        Edit Staff
      </div>
      <div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">ID Number</p>
          <input
            type="text"
            name="IDnumber"
            defaultValue={staff.IDnumber}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Staff Name</p>
          <input
            type="text"
            name="name"
            defaultValue={staff.name}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Date Of Birth</p>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={formattedDateOfBirth}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Job Title</p>
          <select
            name="role"
            defaultValue={staff.role}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          >
            <option value="Nhân viên lễ tân">Nhân viên lễ tân</option>
            <option value="Nhân viên kinh doanh">Nhân viên kinh doanh</option>
            <option value="Nhân viên kế toán">Nhân viên kế toán</option>
          </select>
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Phone Number</p>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={staff.phoneNumber}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Account</p>
          <input
            type="text"
            name="username"
            defaultValue={staff.username}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Password</p>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
            placeholder="Enter new password to change"
          />
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => {
              editData();
            }}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
            disabled={isLoading}
          >
            Submit
          </button>
          <Link
            to="/admin/staff"
            className="rounded-lg text-red-600 py-2 mt-4 w-32"
          >
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
