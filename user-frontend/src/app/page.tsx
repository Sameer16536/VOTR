import { AppBar } from "../../components/AppBar";
import { UploadImage } from "../../components/UploadImage";


export default function Home() {
  return (
    <div className="text-cyan-200">
      <AppBar/>
      
      <UploadImage />
    </div>
  );
}
