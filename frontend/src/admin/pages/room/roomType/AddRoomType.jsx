import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { storage } from "../../../../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import { addNewRoomType } from "../../../../service/roomTypeService";
import Loading from "../../../../components/loading/Loading";

const AddRoomType = () => {
    const nav = useNavigate();
    const inputRef = useRef(null);
    const [image, setImage] = useState([]);
    const [imagesObj, setImagesObj] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const [roomType, setRoomType] = useState({
        name: "",
        price: "",
        images: "",
        capacity: "",
    });

    const addData = async () => {
        console.log(roomType);
        try {
            setIsLoading(true);
            if (imagesObj) {
                for (let i = 0; i < imagesObj.length; i++) {
                    const imageRef = ref(
                        storage,
                        `/images/${imagesObj[i].name}`
                    );

                    try {
                        await uploadBytes(imageRef, imagesObj[i]);

                        roomType.images = await getDownloadURL(imageRef);

                        console.log("Upload success:", roomType.images);
                    } catch (error) {
                        console.error("Upload error:", error);
                    }
                }
            }
            const data = await addNewRoomType(roomType);
            console.log(data);
            if (data?.code === 0) {
                toast.success(data.message);
                nav("/admin/roomtype");
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
        setRoomType({
            ...roomType,
            [name]: value,
        });
    };

    const selectFiles = (e) => {
        inputRef.current.click();
    };

    const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (e) => {
        e.preventDefault();
    };

    const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setImagesObj(files);
        console.log("imgobj: ", imagesObj);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !image.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImage((prevImages) => [
                    ...prevImages,
                    {
                        img: files[i],
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    const onFileSelect = (e) => {
        const files = e.target.files;
        setImagesObj(files);
        console.log("imgobj: ", imagesObj);
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split("/")[0] !== "image") {
                console.log(files[i]);
                continue;
            }
            if (
                !image.some((e) => {
                    e.name === files[i].name;
                })
            ) {
                setImage((prevImages) => [
                    ...prevImages,
                    {
                        img: files[i],
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Room Type
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Category Name</p>
                    <input
                        type="text"
                        name="name"
                        value={roomType.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Rate</p>
                    <input
                        type="number"
                        name="price"
                        value={roomType.price}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Capacity</p>
                    <input
                        type="number"
                        name="capacity"
                        value={roomType.capacity}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <p className="text-gray-500 mt-4">Room Category Images</p>
                <div className="flex justify-between w-1/2">
                    <div className="w-1/2 flex justify-center items-center min-h-48 mt-4 mr-2">
                        <div
                            className="flex flex-col justify-center items-center border-dashed border-spacing-8 border-slate-400 border-2 py-20 rounded-2xl bg-purple-50 w-full mb-0"
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <span className="text-slate-400 text-lg font-semibold">
                                Drag & drop to upload
                            </span>
                            <input
                                type="file"
                                hidden
                                ref={inputRef}
                                onChange={onFileSelect}
                                accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
                            />
                            <span
                                className="pl-1 text-indigo-500 font-bold cursor-pointer mt-4"
                                onClick={selectFiles}
                                role="button"
                            >
                                {" "}
                                or browser
                            </span>
                        </div>
                    </div>
                    <div
                        className={`w-1/2 flex justify-center items-center mt-4 ml-2 bg-gray-300 h-60 rounded-2xl overflow-hidden`}
                    >
                        {image.length > 0 ? (
                            <img
                                src={image[image.length - 1].url}
                                className="h-full w-full"
                            ></img>
                        ) : (
                            <div className="flex flex-col items-center">
                                <i class="fa-solid fa-image text-[32px]"></i>
                                <p className="text-2xl font-semibold">
                                    No image here
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <button
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        onClick={() => {
                            addData();
                        }}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/roomtype"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddRoomType;
