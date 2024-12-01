import {React, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

export const SignupSme = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    //const data = await registerUser({ name, email, password, phone, location, farmSize });
      navigate("/dashboard")
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: '"Inter", serif' }}>
      {/* Left Column */}
      <div className="bg-[#005EFF] text-white flex flex-col p-10 md:w-[40%]">
        <div>
          <h1 className="text-[30px]">Zesty</h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="mt-[75px]">
            <h1 className="text-[42px] font-bold mb-4">
            Start Building Your Future with Zesty
            </h1>
            <p className="text-[16px] text-[#e1edff] font-thin mt-[20px]">
            Are you a small-to-medium enterprise looking to access flexible financing solutions
            or a supplier looking to streamline transactions with your SME partners?
            <span className="text-[#e1edff] font-medium"> Select your role to get started.</span>
            </p>
          </div>
          <Link to="/account-type" className="flex flex-row items-center justify-center w-[100px] h-[45px] mt-8 border-[1px] border-white [#005EFF] hover:bg-[#295bb1] text-white text-sm px-3 py-2 rounded-lg">
            <CircleArrowLeft className="text-white mr-[7px]" size={20} />
            <span className="text-[16px]">Back</span>
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-center bg-[#FAFBFC] px-[80px] py-14 md:w-[60%]">
        <h2 className="text-2xl font-bold mb-6 text-[#252F3F]">Let’s get started</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                <input
                id="first-name"
                type="text"
                placeholder="First name"
                className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
                />
            </div>
            <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                id="last-name"
                type="text"
                placeholder="Last name"
                className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
                />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Email"
                className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
            />
            </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
            <label htmlFor="Country of residence" className="block text-sm font-medium text-gray-700">Country of residence</label>
              <select className="border-[2px] focus:outline-[#005EFF] active:outline-[#005EFF] border-gray-300 pl-2 w-full h-[40px] rounded-lg">
                <option className="text-[#252F3F]">Country of residence</option>
                <option>South Africa</option>
                <option>Namibia</option>
                <option>Botswana</option>
                <option>Lesotho</option>
                <option>Eswatwini</option>
                <option>Canada</option>
              </select>
            </div>
            <div>
            <label htmlFor="Province" className="block text-sm font-medium text-gray-700">Province</label>
            <select className="border-[2px] focus:outline-[#005EFF] active:outline-[#005EFF] border-gray-300 pl-2 w-full h-[40px] rounded-lg">
              <option>Province</option>
              <option>Delaware</option>
              <option>California</option>
            </select>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3">
              <label htmlFor="Code" className="block text-sm font-medium text-gray-700">Code</label>
              <input
                id="Code"
                type="text"
                placeholder="+27"
                className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
              />
            </div>
            <div className="col-span-9">
            <label htmlFor="Phone number" className="block text-sm font-medium text-gray-700">Phone number</label>
              <input
                id="Phone number"
                type="text"
                placeholder="Phone number"
                className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
              />
            </div>
          </div>
          <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="border-[2px] focus:outline-[#005EFF] border-gray-300 p-3 w-full h-[40px] rounded-lg"
          />
          </div>
          <button
            type="submit"
            className="flex flex-row focus:outline-[#005EFF] items-center justify-center w-full bg-[#005EFF] hover:bg-[#295bb1] text-white p-3 rounded-lg font-medium"
          >
            <span>GET STARTED</span>
            <CircleArrowRight className="text-white ml-[7px]" size={19} />
          </button>
        </form>
      </div>
    </div>
  )
}
