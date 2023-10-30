import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CreateEditFormThread from "../../components/CreateEditThreadForm";
import { getThread } from "../../services/threads";

export default function EditThread() {
  //form that will hold fields with setter
  const [form, setForm] = useState({
    title: "",
  });

  //getting id from parameters
  const { ThreadId, ProjectId } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
   getThread(ThreadId).then((thread) => {
      console.log("thread: ", thread);
      setForm(thread.data);
    });
  }, [ThreadId]);

  return (
    <div className="forms">
      <CreateEditFormThread
        title="editThread"
        type="editThread"
        form={form}
        setForm={setForm}
        ThreadId={ThreadId}
        ProjectId={ProjectId}
      />
      <Link className="link-button" to={`/threads/${ProjectId}`}>
        <FaArrowLeft />
        Go back
      </Link>
    </div>
  );
}
