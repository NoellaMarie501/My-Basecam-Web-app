import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../utils/handleChange";
import { useThreadsContext } from "../context/threads/threadsContext";
import {
  createThread,
  //getThreadsByProject,
  updateThread,
} from "../services/threads";

const CreateEditFormThread = ({
  title,
  type,
  form,
  setForm,
  ThreadId,
  ProjectId,
}) => {
  //const decode = getLoggedInUser();
  const navigate = useNavigate();
  const [created, setIsCreated] = useState(false);
  const { getThreadsByProject } = useThreadsContext();

  //method to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log("threads", form);
    //checking if we are creating or editing a Thread
    if (type === "createThread") {
      createThread({ formData: form, ProjectId }).then((response) => {
        //console.log("threads", response);
        if(response){
          setIsCreated('success')
        }
      });
    } else if (type === "editThread") {
     // console.log("inside here")
     
      updateThread(ThreadId, { ...form }).then((response) => {
      //  console.log("threads", response);
      });
    }
    getThreadsByProject();
    navigate(`/threads/${ProjectId}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        {created && <p>{created}</p>}
        <h1>{title}</h1>
        <br />
        <label htmlFor="title">Thread Title: </label>
        <input
          value={form.title}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter Thread Title"
          name="title"
        ></input>
        <br />
        
        <button type="submit">Submit</button>
        <br />
      </form>
    </>
  );
};

export default CreateEditFormThread;
