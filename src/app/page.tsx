import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { protectedServer } from "@/features/auth/utils";

async function Home() {

await protectedServer()
  return (
    <div>
     You are logged In
    </div>
  );
}

export default Home;
