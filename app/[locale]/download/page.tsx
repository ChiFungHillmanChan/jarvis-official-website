import { getCopy } from "@/content/getCopy";
import DownloadClient from "./DownloadClient";

export default async function DownloadPage() {
  const copy = await getCopy();
  return <DownloadClient copy={copy.download} />;
}
