import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import React from "react";
import EditProfile from "../../components/Form/EditProfile";
import EditBlogForm from './../../components/Form/EditBlogForm';

const DashboardEditBlog = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      {/* <form className="grid md:grid-cols-2 gap-6" action="#" method="post">
        <label className="block">
          <Label>First name</Label>
          <Input placeholder="Example Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Last name</Label>
          <Input placeholder="Doe" type="text" className="mt-1" />
        </label>
        <label className="block">
          <Label>Current password</Label>
          <Input placeholder="***" type="password" className="mt-1" />
        </label>
        <label className="block">
          <Label>New password</Label>
          <Input type="password" className="mt-1" />
        </label>
        <label className="block md:col-span-2">
          <Label> Email address</Label>
          <Input
            type="email"
            placeholder="example@example.com"
            className="mt-1"
          />
        </label>
        <ButtonPrimary className="md:col-span-2" type="submit">
          Update profile
        </ButtonPrimary>
      </form> */}
      <EditBlogForm />
    </div>
  );
};

export default DashboardEditBlog;
