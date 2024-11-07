import { useState } from "react";

export default function ServiceBookingModal({
  visible,
  onClose,
  serviceBooking,
  setServiceBooking,
  services,
}) {
  const [choosenService, setChoosenService] = useState("");
  const [choosenServiceQuantity, setChoosenServiceQuantity] = useState("");

  const handleSubmit = () => {
    let flag = false;

    setServiceBooking((prevService) => {
      return prevService
        .map((serviceBooking) => {
          if (choosenService === serviceBooking.service) {
            flag = true;
            return {
              ...serviceBooking,
              quantity:
                serviceBooking.quantity + parseInt(choosenServiceQuantity, 10),
            };
          }
          return serviceBooking;
        })
        .concat(
          flag
            ? []
            : [
                {
                  service: choosenService,
                  quantity: parseInt(choosenServiceQuantity, 10),
                },
              ]
        );
    });
    onClose();
    setChoosenService("");
    setChoosenServiceQuantity("");
  };

  return (
    <div
      className={` top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-60 flex items-center justify-center ${
        visible ? "fixed" : "hidden"
      }`}
    >
      <div className="bg-white w-1/2 rounded-xl animate-modalFaceIn">
        <div className=" flex flex-col items-center w-full relative p-8">
          <div
            className="absolute right-0 top-0 cursor-pointer px-4 py-2"
            onClick={() => {
              onClose();
              setChoosenService("");
              setChoosenServiceQuantity("");
            }}
          >
            <i class="fa-regular fa-xmark p-2"></i>
          </div>
          <div className="text-[36px] text-gray-600 font-semibold my-4">
            Add Service Form
          </div>
          <div className="w-full">
            <div className=" mb-4">
              <p className="text-gray-500 mb-2">Service Name</p>
              <select
                className="select select-bordered w-full text-gray-500"
                value={choosenService}
                onChange={(e) => {
                  setChoosenService(e.target.value);
                }}
              >
                <option disabled hidden value=""></option>
                {services.data
                  ? services.data.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className=" mb-4">
              <p className="text-gray-500 mb-2">Service Quantity</p>
              <select
                className="select select-bordered w-full text-gray-500"
                value={choosenServiceQuantity}
                onChange={(e) => {
                  setChoosenServiceQuantity(e.target.value);
                }}
              >
                <option disabled hidden value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              className={`py-2 px-16 text-white ${
                choosenService && choosenServiceQuantity
                  ? "bg-black"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!choosenService || !choosenServiceQuantity}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
