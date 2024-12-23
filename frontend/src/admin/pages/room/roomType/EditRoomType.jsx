import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { storage } from "../../../../firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import {
    editRoomType,
    viewRoomtype,
} from "../../../../service/roomTypeService";
import toast from "react-hot-toast";
import Loading from "../../../../components/loading/Loading";

const EditRoomType = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const inputRef = useRef(null);
    const [image, setImage] = useState([]);
    const [imagesObj, setImagesObj] = useState();
    //   const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [roomType, setRoomType] = useState({
        name: "",
        price: "",
        images: "",
        capacity: "",
    });
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            setRoomType(await viewRoomtype(id));
            // if (data?.code === 0) {
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const editData = async () => {
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
            const data = await editRoomType(id, roomType);
            console.log(data);
            if (data.code === 0) {
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

    const images = [];
    const handleSubmit = async (e) => {
        if (imagesObj) {
            for (let i = 0; i < imagesObj.length; i++) {
                const imageRef = ref(storage, `/images/${imagesObj[i].name}`);

                try {
                    await uploadBytes(imageRef, imagesObj[i]);

                    const url = await getDownloadURL(imageRef);

                    images.push(url);

                    console.log("Upload success:", url);
                } catch (error) {
                    console.error("Upload error:", error);
                }
            }
            console.log(images[0]);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Edit Room Type
            </div>
            <div>
                {/* <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Category Code</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
                    />
                </div> */}
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Category Name</p>
                    <input
                        type="text"
                        name="name"
                        defaultValue={roomType.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Rate</p>
                    <input
                        type="text"
                        name="price"
                        defaultValue={roomType.price}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Capacity</p>
                    <input
                        type="text"
                        name="capacity"
                        defaultValue={roomType.capacity}
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
                        className={`w-1/2 flex justify-center items-center mt-4 ml-2 bg-gray-300 h-56 rounded-2xl overflow-hidden`}
                    >
                        {image.length > 0 ? (
                            <img
                                src={image[image.length - 1].url}
                                className="h-full w-full"
                            ></img>
                        ) : (
                            <img
                                src={roomType.images}
                                className="h-full w-full"
                            ></img>
                        )}
                    </div>
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

export default EditRoomType;
