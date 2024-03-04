import Reminders from "../../components/reminders/Reminders";
import { useParams } from "react-router-dom";
export default function RemindersPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Reminders idParam={id} />
    </div>
  );
}
