import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

async function Home() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}

export default Home;
