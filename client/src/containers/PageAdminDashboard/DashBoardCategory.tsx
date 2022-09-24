import React from "react";
import CategoryForm from "../../components/DashBoard/Category/categoryForm";
import Table from "rc-table";
import "rc-table/assets/index.css";

const DashBoardCategory = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Edit",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Delete",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   width: 100,
    // },
  ];
  const data=[
    
      {key:1, name:"Awais",age:16},
      {key:2, name:"Awais", age:16},
  ]
  
  return (
    <div className="flex w-full justify-center items-center flex-col gap-3 ">
      <CategoryForm />
      {/* <Table columns={columns} data={data} rowKey="id" /> */}
    </div>
  );
};

export default DashBoardCategory;
