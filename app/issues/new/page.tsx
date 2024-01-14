"use client";

import { TextField, TextArea, Button } from "@radix-ui/themes";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit Issue</Button>
    </div>
  );
};

export default newIssuePage;
