import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateEditFormProject from "../../components/CreateEditProjectForm";
import { getProject } from "../../services/project";
import { FaArrowLeft } from "react-icons/fa";

export default function EditProject(props) {
  //form that will hold fields with setter
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  //getting id from parameters
  const { id } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
    const project = getProject(id).then((project) => {
      console.log("project: ", project);
      setForm(project.data);
    });
  }, [id]);
 
  return (
    <div className="forms">
      <CreateEditFormProject
        title={"Edit Project"}
        type="editProject"
        form={form}
        setForm={setForm}
        project_id={id}
      />
      <Link className="link-button" to="/index">
        <FaArrowLeft />
        Go back to Project list
      </Link>
    </div>
  );
}
