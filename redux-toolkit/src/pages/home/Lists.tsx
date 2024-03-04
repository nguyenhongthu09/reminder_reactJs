import Lists from "../../components/lists/Lists";
import { useParams } from "react-router-dom";
export default function HomeLists() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Lists idParam={id} />
    </div>
  );
}
