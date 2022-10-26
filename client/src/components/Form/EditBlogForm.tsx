import React, { useEffect, useRef, useState } from "react";
import Input from "../Input/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonPrimary from "../Button/ButtonPrimary";
import Textarea from "../Textarea/Textarea";
import Label from "..//Label/Label";
import Card11 from "../Card11/Card11";
import { useAppSelector } from "../../app/hook";
import { Form, Formik, Field, ErrorMessage, FormikProvider } from "formik";
import FormikControl from "./FormikControl";
import Select from "react-select";
import * as Yup from "yup";
import TextError from "./TextError";
import { useAppDispatch } from "./../../app/hook";
import { createBlog, updateBlog } from "./../../app/blogs/blogActions";
import ReactQuilCustom from "../Editor/ReactQuilCustom";
import { useParams } from "react-router-dom";
import { getAPI } from "../../utils/fetchData";
import Card11V2 from "../Card11/Card11V2";
import { Audio } from  'react-loader-spinner'


const EditBlogForm = () => {
  const user = useAppSelector((state) => state.auth.user);
  const categories = useAppSelector((state) => state.category);
  const { id } = useParams();
  // const [options, setoptions] = useState([])
  const dispatch = useAppDispatch();

  const options = categories.map((item, key) => {
    return { value: item.id, label: item.name };
  });
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];
  const dateOptions: Intl.DateTimeFormatOptions = { dateStyle: "full" };

  const [initialState, setinitialState] = useState<any>({});
  const validationSchema = Yup.object({
    title: Yup.string().required("Required").min(10).max(90),
    description: Yup.string().required("Required").min(50).max(300),
    // category: Yup.string().required("Required"),
    content: Yup.string().required("Required").min(600),
    thumbnail: Yup.mixed()
      .required("A file is required")
      // .test(
      //   "fileSize",
      //   "File too large",
      //   (value) => value && value.size <= FILE_SIZE
      // )
      // .test(
      //   "fileFormat",
      //   "Unsupported Format",
      //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
      // ),
  });

  const container = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: "sub" }, { script: "super" }], // superscript/subscript

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ align: [] }],

    ["clean", "link", "image", "video"],
  ];

  const modules = { toolbar: { container } };

  const populateData = async () => {
    try {
      console.log(id);
      const res = await getAPI(`blog/${id}`);
      console.log(res.data);

      setinitialState({ ...initialState, ...res.data });
      //   console.log(res.data)
      //   setinitialState({
      //     name: user.name,
      //     account: user.account,

      //     file: "",
      //   });
      //   setImage(user.avatar);
    } catch (error) {}
  };

  useEffect(() => {
    populateData();
  }, [id]);

  const handleSubmit = ({
    title,
    description,
    category,
    content,
    thumbnail,
    type
  }) => {
    // console.log(category.id)
    dispatch(updateBlog({ title, description, category:category.id, content, thumbnail,id,type }));
  };

  return (
    <>
      {initialState && (
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => {
            return (
              <Form className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  {/* <FormikControl
             control="input"
             type="text"
             label="Post Tilte"
             name="title"
             className=""
             // value={formik.values.title}
           /> */}

                  <label className="block ">
                    <Label>Post Title *</Label>
                    <Field name="title" as={Input} />
                    <ErrorMessage component={TextError} name="title" />
                  </label>
                  <label className="block ">
                    <Label>Post Excerpt</Label>

                    {/* <Textarea className="mt-1" rows={4} /> */}
                    <Field name="description" as={Textarea} />
                    <p className="mt-1 text-sm text-neutral-500">
                      Brief description for your article. URLs are hyperlinked.
                    </p>
                    <ErrorMessage component={TextError} name="description" />
                  </label>
                  <label className="block ">
                  <Label>Type *</Label>
                  <Field
                    name="type"
                    render={({ field }) => (
                      <div className="flex flex-row space-x-2">
                        <div className="flex p-2 items-center gap-2">
                          <input
                            {...field}
                            id="free"
                            value="free"
                            checked={field.value === "free"}
                            name="type"
                            type="radio"
                          />
                          <label htmlFor="Free">Free</label>
                        </div>

                        <div className="flex p-2 items-center gap-2">
                          <input
                            {...field}
                            id="premium"
                            value="premium"
                            name="type"
                            checked={field.value === "premium"}
                            type="radio"
                          />
                          <label htmlFor="premium">Premium</label>
                        </div>
                      </div>
                    )}
                  />
                  <ErrorMessage component={TextError} name="title" />
                </label>
                  <label className="block">
                    <Label>Category</Label>
                    <Select
                      options={categories}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      value={formik.values.category}
                      onChange={(item: any) => {
                        // formik.setFieldValue("categories", [
                        //   { name: value.label },
                        // ])
                        formik.setFieldValue("category", item);
                      }}
                    />
                    <ErrorMessage name="category" component={TextError} />
                  </label>

                  <div className="block md:col-span-2">
                    <Label>Featured Image</Label>

                    <div
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 ${
                        !formik.values.thumbnail
                          ? "border-dashed"
                          : "border-solid"
                      } rounded-md`}
                    >
                      <div className="space-y-1 text-center">
                        {!formik.values.thumbnail && (
                          <svg
                            className="mx-auto h-12 w-12 text-neutral-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        )}

                        <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            {formik.values.thumbnail ? (
                              <span>📁 {formik.values.thumbnail.name}</span>
                            ) : (
                              <>
                                {" "}
                                <span>Upload a file</span>
                                <p className="text-xs text-neutral-500">
                                  PNG, JPG, GIF up to 2MB
                                </p>{" "}
                              </>
                            )}

                            <input
                              id="file-upload"
                              name="thumbnail"
                              type="file"
                              className="sr-only"
                              // value={formik.values.featuredImage}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "thumbnail",
                                  e.target.files[0]
                                );
                                formik.setFieldValue(
                                  "featuredImage",
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                          </label>
                          {/* <p className="pl-1">or drag and drop</p> */}
                        </div>
                      </div>
                    </div>
                    {/* {formik.values.thumbnail && formik.values.thumbnail.name} */}
                    <ErrorMessage name="thumbnail" component={TextError} />
                  </div>
                </div>
                <img
                  src={
                    formik.values.thumbnail instanceof File
                      ? URL.createObjectURL(formik.values.thumbnail)
                      : formik.values.thumbnail
                  }
                  alt=""
                />
                {/* <div className="flex flex-col  gap-4 justify-center ">
             {initialState &&   <Card11V2
               post={formik.values}
               key={formik.values.id}
               className=""
             /> }
            
             <span className="self-center">Card Preview</span>
           </div> */}
                <div className="md:col-span-2 flex flex-col gap-3 mb-12">
                  <label
                    htmlFor="content"
                    className="font-bold flex items-center"
                  >
                    Blog Content
                    <ErrorMessage name="content" component={TextError} />
                  </label>
                  <Field name="content">
                    {({ field }) => <ReactQuilCustom field={field} />}
                  </Field>
                </div>

                <ButtonPrimary className="md:col-span-2 mt-8" type="submit">
                  Submit post
                </ButtonPrimary>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default EditBlogForm;
