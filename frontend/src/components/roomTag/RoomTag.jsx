import React from "react";

const RoomTag = ({
    img,
    name,
    price,
    bed,
    quantity,
    onSelectChange,
    index,
}) => {
    const handleChange = (e) => {
        onSelectChange(e.target.value, index);
    };
    return (
        <div className="w-[32%] shadow-xl mt-6">
            <img src={img} alt="" className="h-[280px] w-full" />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-xl">{name}</p>
                    <p className="p-2 bg-blue-500 text-white font-semibold rounded-md text-sm">
                        {price}VND / night
                    </p>
                </div>
                <div className="flex my-4 text-sm">
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-bed"></i>
                        {bed}
                    </div>
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-bath"></i> 1
                        Bath
                    </div>
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-wifi"></i>
                        Wifi
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <div>
                        <i class="fa-regular fa-house-user text-blue-400 mr-2"></i>
                        Room quantity
                    </div>
                    <select
                        name=""
                        id=""
                        className="border px-2 py-1 rounded-md"
                        onChange={handleChange}
                    >
                        <option value="0" selected>
                            0 room
                        </option>
                        {(() => {
                            const options = [];
                            for (let i = 0; i < quantity; i++) {
                                options.push(
                                    <option value={i + 1}>{i + 1} rooms</option>
                                );
                            }
                            return options;
                        })()}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RoomTag;
