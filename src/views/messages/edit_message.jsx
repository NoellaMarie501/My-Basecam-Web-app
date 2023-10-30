import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMessage,
  getMessagesByThread,
  updateMessage,
} from "../../services/messages";
import { handleChange } from "../../utils/handleChange";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function EditMessage() {
  //form that will hold fields with setter
  const [form, setForm] = useState({
    content: "",
  });
  const navigate = useNavigate();

  //getting id from parameters
  const { MessageId, ThreadId, ProjectId } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
    getMessage(MessageId).then((Message) => {
      console.log("this Message: ", Message);
      setForm(Message.data.data);
    });
  }, [MessageId]);
  const handleSubmit = (e) => {
    e.preventDefault();

    //checking if we are creating or editing a project

    updateMessage(MessageId, { ...form }).then((response) => {});
    getMessagesByThread(ThreadId);
    navigate(`/threads/${ProjectId}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
        <p>Edit Message</p>
        <br />
        <input
          value={form.content}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="type message"
          name="content"
        ></input>
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      <Link className="link-button" to={`/threads/${ProjectId}`}>
        <FaArrowLeft />
        Go back
      </Link>
    </>
  );
}
