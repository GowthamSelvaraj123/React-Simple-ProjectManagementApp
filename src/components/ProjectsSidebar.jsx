import Button from "./Button";
import { useState, useEffect } from "react";
export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  const [isNavOpen, setIsNavOpen] = useState(true); 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (<>
      <div
    className="HAMBURGER-ICON space-y-2"
    onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
  >
    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
    <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
  </div>
    <aside
  className={`w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
  
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          console.log(
            "project.id: " + project.id + ", selectedProjectId: " + selectedProjectId
          );
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          }
          // Render each project item
          return (
            <li key={project.id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project.id)} // Correctly passing the project ID
              >
                {project.title}
              </button>
            </li>
          );
          
        })}
      </ul>
    </aside>
    </>
  );
}
