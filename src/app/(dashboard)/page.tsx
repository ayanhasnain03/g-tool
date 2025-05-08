
import { protectedServer } from "@/features/auth/utils";
import { Banner } from "./banner";
import { ProjectsSection } from "./project-section";
import { TemplatesSection } from "./templates-section";


async function Home() {
await protectedServer()
  return (
<div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
       <Banner />
<TemplatesSection/>

       <ProjectsSection/>
     </div>
  );
}

export default Home;
