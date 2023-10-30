import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateEditFormProject from "../../components/CreateEditProjectForm";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateProject() {
  const [form, setForm] = useState({
    name : "",
    description: ""
  });

  //const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  return (
    <div className="forms">
        
      <CreateEditFormProject
        title={"Create Project"}
        type="createProject"
        form={form}
        setForm={setForm}
      />
        <Link className="link-button" to="/index">
          <FaArrowLeft />
          Go back to Project list
        </Link>
     
    </div>
  );
}
