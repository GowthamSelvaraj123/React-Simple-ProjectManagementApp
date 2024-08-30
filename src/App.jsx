import { useState } from "react";
import ProjectSidebar from "./components/projectsSidebar";
import NewProject from "./components/NewProject";
import NoProjecSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import NewTask from "./components/NewTask";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[]
  });
  function handleAddTask(text)
  {
    const taskId = Math.random();
    setProjectsState((prevState) => {
      const newTask = {
        text:text,
        projectId:prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks:[newTask, ...prevState.tasks ],
      };
    });
  }
  function handleDeleteTask(id)
  {
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id), 

    }));
  }
  function handleSelectProject(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: projectId, // Ensure unique and consistent ID generation
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }
  function handleDeleteProject()
  {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId), 

    }));
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjecSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} // Correctly passing selectedProjectId
      />
      {content}
    </main>
  );
}

export default App;
