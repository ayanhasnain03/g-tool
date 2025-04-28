import { protectedServer } from "@/features/auth/utils";
import { Editor } from "@/features/editor/components/editor";

const EditorProjectIdPage = async() => {
 await protectedServer();
  return (
    <>
      <Editor />
    </>
  );
};

export default EditorProjectIdPage;
