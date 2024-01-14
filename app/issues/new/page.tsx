"use client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

import { TextField, Button } from "@radix-ui/themes";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit Issue</Button>
    </div>
  );
};

export default newIssuePage;
