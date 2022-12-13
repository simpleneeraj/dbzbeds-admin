// RichText.tsx in your components folder
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

export default RichTextEditor;
