"use client";
import { Switch } from "@headlessui/react";
import { lostItemCategories, regions } from "@/utils/data";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaHandPointLeft} from 'react-icons/fa'
import { useFormik } from "formik";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { client } from "../client";
import { generateItemDoc } from "@/utils/generateItem";
import { validate } from "@/utils/formValidate";
import { useRouter } from "next/navigation";
import { today } from "./today";
import BackButton from "@/components/BackButton";

const PostItemPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [foundOrLost, setFoundOrLost] = useState("found");
  const [buttonHovered, setButtonHovered] = useState(false);
  const router = useRouter();
  const [posting, setPosting] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [imageAsset, setImageAsset] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/jpg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/svg+xml"
    ) {
      setWrongImageType(false);

      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          type: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((asset) => {
          setImageAsset(asset);
          setLoading(false);
          console.log(asset);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      region: "",
      category: "",
      date: "",
      tel: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      if (!imageAsset) {
        alert("Please upload an image");
        return;
      }
      setPosting(true);
      const doc = generateItemDoc(values, imageAsset, foundOrLost);

      client.create(doc).then((res) => {
        console.log(res);
        alert(
          "Item posted successfully\n" + `Here is your post id : ${res._id}`
        );
        setPosting(false);
        router.push(`/${foundOrLost}-items`);
      });
    },
  });
  if (posting) {
    return (
      <Spinner message={"Posting your lost item to the server, please wait"} />
    );
  }
  // md:bg-[url('/form.jpg')] bg-[url('/form2.jpg')]
  return (
    <div className="innerWidth flex bg-primary bg-center bg-no-repeat bg-cover bg-fixed   flex-col ">
      <BackButton></BackButton>
      <div
        className={`shadow-lg m-auto flex lg:flex-row flex-col items-center bg-[rgba(255,255,255,0.45)] backdrop-blur-[20px] lg:p-5 p-3 w-full md:max-w-[700px] my-10 rounded-md border border-${
          foundOrLost == "found" ? "green" : "red"
        }-500`}
      >
        <div className=" p-3 felx flex-0.7 w-full">
          <div className="flex items-center gap-3 text-white text-2xl"> <Switch
            checked={enabled}
            onChange={() => {
              setEnabled(!enabled);
              setFoundOrLost((current) =>
                current == "found" ? "lost" : "found"
              );
            }}
            className={`${
              enabled ? "bg-red-600" : "bg-green-500"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch> <FaHandPointLeft></FaHandPointLeft></div>
         
          <h1 className="text-2xl md:text-3xl mb-7 font-bold text-gray-700 underline text-center">
            {foundOrLost == "found" ? "Found" : "Lost"} Item Form
          </h1>
          <div className="flex mb-5 justify-center items-center flex-col border-2 border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && (
              <p className="text-red-500 text-xl mb-5 transition-all ease-in duration-150">
                Wrong Image Type
              </p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Upload Image</p>
                  </div>
                  <p className="text-gray-500">
                    {foundOrLost == "found"
                      ? "Please provide an image of your found item"
                      : " We know you might not have an image of your lost item, but we encourage you to put a similar or identical image."}
                  </p>
                </div>
                <input
                  type="file"
                  className="w-0 h-0 p-0 "
                  onChange={uploadImage}
                  name="upload-Image"
                />
              </label>
            ) : (
              <div className="relative max-w-[500px]">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute inset-3 w-10 h-10 flex items-center justify-center hover:bg-red-500 rounded-full outline-none hover:shadow-md transition-all duration-150 ease-in-out text-black bg-secondaryColor p-2 cursor-pointer"
                >
                  <MdDelete onClick={() => setImageAsset(null)} />
                </button>
              </div>
            )}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-5 md:max-w-[700px]"
          >
            <label className="label">
              What did you {foundOrLost == "found" ? "found" : "lost"}?
              <input
                className="input"
                placeholder="Credit Card , My cat, Purse"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="form-error"> {formik.errors.title}</div>
              ) : null}
            </label>
            <label className="label">
              Describe your {foundOrLost == "found" ? "found" : "lost"} item.
              <textarea
                className="textarea"
                placeholder=""
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="form-error"> {formik.errors.description}</div>
              ) : null}
            </label>
            <label className="label">
              Select your location
              <select
                value={formik.values.region}
                onChange={formik.handleChange}
                name="region"
                onBlur={formik.handleBlur}
                className="select"
              >
                {regions.map((region) => {
                  return (
                    <option key={region} value={region.toLowerCase()}>
                      {region.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              {formik.touched.region && formik.errors.region ? (
                <div className="form-error"> {formik.errors.region}</div>
              ) : null}
            </label>
            <label className="label">
              Select Category to help people find your item more easily.
              <select
                className="select"
                value={formik.values.category}
                onChange={formik.handleChange}
                name="category"
                onBlur={formik.handleBlur}
              >
                {lostItemCategories.map((cg) => {
                  return (
                    <option key={cg} value={cg.toLowerCase()}>
                      {cg}
                    </option>
                  );
                })}
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div className="form-error"> {formik.errors.category}</div>
              ) : null}
            </label>
            <label className="label">
              When did that happened?
              <input
                className="input"
                max={today}
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="form-error"> {formik.errors.date}</div>
              ) : null}
            </label>
            <fieldset>
              How to contact you?
              <div className="flex flex-col  gap-5 md:flex-row">
                <label className="label">
                  Telephone*
                  <input
                    className="input"
                    type="text"
                    name="tel"
                    placeholder="09123456789 or +959123456789"
                    value={formik.values.tel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.tel && formik.errors.tel ? (
                    <div className="form-error"> {formik.errors.tel}</div>
                  ) : null}
                </label>
                <label className="label">
                  Email
                  <input
                    className="input"
                    type="email"
                    placeholder="youremail@mail.com"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>
            </fieldset>
            <button
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              type="submit"
              className={`relative bg--500 font-bold py-4 text-white hover:scale-105 `}
            >
              Submit
              {buttonHovered && (
                <div
                  className={`absolute z-50 -top-[150px] left-0 text-white  bg-${
                    enabled ? "red" : "green"
                  }-500 opacity-90 p-5 font-semibold`}
                >
                  <p>
                    After submitting your{" "}
                    {foundOrLost == "found" ? "found" : "lost"} item, you will
                    get a{" "}
                    <span className="bg-white text-primary">unique ID </span>
                    that can be used to modify or delete your form. You should
                    keep it secret or others will try to modify your post. We
                    don't implement user account system because lost and found
                    situations are not like social media.
                  </p>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItemPage;
