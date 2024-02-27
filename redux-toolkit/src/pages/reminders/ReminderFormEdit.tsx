import React, { useState } from "react";
import Reminder from "../../components/reminders/atomics/Reminder";
import { IReminderType } from "../../types/reminder.type";
import { connect } from "react-redux";
import {
  deleteReminder,
  updateReminder,
} from "../../store/redux/actions/reminder.action";
import { useParams } from "react-router-dom";
interface IStateToProps {
  reminder: IReminderType;
}

interface IDispatchToProps {
  deleteReminder: (idDeleReminder: string) => Promise<void>;
  updateReminder: (
    idEditReminder: string,
    newData: string | boolean,
    updateType: string
  ) => Promise<void>;
}

const ReminderFormEdit: React.FC<IStateToProps & IDispatchToProps> = ({
  reminder,
  deleteReminder,
  updateReminder,
}) => {
  const [, setIsDoneButtonDisabled] = useState<boolean>(true);
  const { id } = useParams();

  return (
    <div>
      <Reminder
        key={id}
        setIsDoneButtonDisabled={setIsDoneButtonDisabled}
        reminder={reminder}
        onDeleteReminder={deleteReminder}
        onUpdateReminder={updateReminder}
      />
    </div>
  );
};

const mapStateToProps = (state: any): IStateToProps => ({
  reminder: state.reminderReducer.reminder,
});

const mapDispathToProps = (dispatch: any) => {
  return {
    deleteReminder: (idDeleReminder: string) =>
      dispatch(deleteReminder(idDeleReminder)),
    updateReminder: (
      idEditReminder: string,
      newData: string | boolean,
      updateType: string
    ) => dispatch(updateReminder(idEditReminder, newData, updateType)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(ReminderFormEdit);
