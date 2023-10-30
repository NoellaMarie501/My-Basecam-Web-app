import { Route, Routes, Navigate } from "react-router-dom";

import Register from "../views/auth/register";
import SignIn from "../views/auth/signin";
import CreateProject from "../views/projects/createProject";
import EditProject from "../views/projects/editProject";
import IndexPage from "../views/projects/index";
import EditUser from "../views/users/editUser";
import UserPage from "../views/users/users";
import NewAttachment from "../views/attachments/createAttachment";
import ViewProject from "../views/projects/viewProject";
import ViewProjectThreads from "../views/threads/viewThead";
import ViewMessagesByThreads from "../views/messages/viewMessages";
import CreateThread from "../views/threads/createThread";
import EditThread from "../views/threads/editThread";
import EditMessage from "../views/messages/edit_message";
import AssociateUserToProject from "../views/users/associateUser";
import Header from "../header";
import ViewUser from "../views/users/viewUser";

export default function Routers() {

    return (
        <>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<Navigate to="/signin" />} />
                <Route path="/profile" element={<ViewUser />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users/:id" element={<EditUser />} />

                <Route path="/associateUser/:ProjectId" element={<AssociateUserToProject />} />
                {/* Project Routes */}
                <Route path="/index" element={<IndexPage />} />
                <Route path="/createProject" element={<CreateProject />} />
                <Route path="/projects/:id" element={<EditProject />} />
                <Route path="/projects/view/:id" element={<ViewProject />} />
                {/*Attachment routes*/}
                <Route path="/createAttachments" element={<NewAttachment />} />
                {/*Thread Routes*/}
                <Route path="/threads/:ProjectId" element={<ViewProjectThreads />} />
                <Route path="/threads/new_thread/:ProjectId" element={<CreateThread />} />
                <Route path="/threads/edit_thread/:ThreadId/:ProjectId" element={<EditThread />} />
                {/*Messages Routes*/}
                <Route path="/messages/:ThreadId" element={<ViewMessagesByThreads />} />
                <Route path="/messages/edit_message/:MessageId/:ThreadId/:ProjectId" element={<EditMessage />} />
                {/*Main Thread Route*/}
                {/* <Route path="/threads/:ProjectId" element={<ViewMessagesByThreads />} /> */}
            </Routes>
        </>

    );
}