import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { protectedServer } from "@/features/auth/utils";

async function Home() {

await protectedServer()
const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}

export default Home;
