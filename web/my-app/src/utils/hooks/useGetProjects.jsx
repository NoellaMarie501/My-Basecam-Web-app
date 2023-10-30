import { useState, useEffect } from "react";
import { getProjects } from "../../services/project";
import { getUser } from "../../services/users";

export const useGetProjects = ({refetch = false } = {}) => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const response = await getProjects();
        const projectsWithUser = await Promise.all(
          response.data.map(async (project) => {
            const user = await getUser(project.UserId);
            return { ...project, user };
          })
        );
        setProjects(projectsWithUser);
        //console.log("projectWithUser: ", projectsWithUser)
      };
      useEffect(() => {
        //console.log('rerednder: ', refetch)
        fetchProjects();
      }, [refetch]);

      //console.log('Projects1: ' + projects)
    return {
        projects
    }
}