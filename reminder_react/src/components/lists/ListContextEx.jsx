// import React, { useState, useEffect, useCallback, useContext } from "react";
// import List from "./List";
// import getColor from "../../fetchApi/fetchColor";
// import ListForm from "./ListForm";
// import Reminders from "../reminders/Reminders";
// import ReminderForm from "../reminders/ReminderForm";
// import {
//   addNewList,
//   updateListData,
//   delList,
// } from "../../fetchApi/fetchApiList";
// import Button from "../core/Button";
// import Loading from "../core/Loading";
// import { ListContext } from "../../context/ListContext";
// import getAllList from "../../fetchApi/fetchApiList";
// function Lists() {
//   const [colors, setColors] = useState([]);
//   const [listForm, setListForm] = useState(false);
//   const [formType, setFormType] = useState("");
//   const [selectedListId, setSelectedListId] = useState(null);
//   const [reminderForm, setReminderForm] = useState(false);
//   const [reminders, setReminders] = useState(false);
//   const [loading] = useState(false);
//   const [listData, setListData] = useState(null);
//   const [nameList, setNameList] = useState("");
//   const context = useContext(ListContext);
//   const setFormTypeHandler = (type) => {
//     setListForm(type === "add" || type === "edit");
//     setFormType(type);
//   };

//   //GET COLOR
//   const getColors = async () => {
//     try {
//       const colorData = await getColor();

//       setColors(colorData.map((colors) => colors.color));
//     } catch (error) {
//       console.error("Error fetching colorData:", error.message);
//     }
//   };

//   // ADD LISTNOTE
//   const addListServiceForm = useCallback(
//     async (newList) => {
//       try {
//         if (formType === "add") {
//           newList.totalDone = 0;
//           newList.totalCount = 0;
//           await addNewList(newList);
//           setListForm(false);
//           context.setListNote((prevListNote) => [...prevListNote, newList]);
//         }
//       } catch (error) {
//         console.error("Lỗi khi gửi dữ liệu:", error.message);
//       }
//     },
//     [formType]
//   );

//   //EDIT LISTNOTE
//   const editListServiceForm = useCallback(
//     async (list) => {
//       try {
//         if (formType === "edit") {
//           const updatedListNote = context.listNote.map((listNote) =>
//             listNote.id === list.id
//               ? {
//                   ...listNote,
//                   name: list.name,
//                   isColor: list.isColor,
//                 }
//               : listNote
//           );
//           const updatedList = updatedListNote.find(
//             (listNote) => listNote.id === list.id
//           );

//           setListForm(false);
//           context.setListNote(updatedListNote);
//           console.log("Cập nhật thành công", updatedList);
//           const currentTotalDone = updatedList.totalDone;
//           const currentTotalCount = updatedList.totalCount;
//           await updateListData(
//             list.id,
//             list.name,
//             list.isColor,
//             currentTotalDone,
//             currentTotalCount
//           );
//         }
//       } catch (error) {
//         console.error("Lỗi khi gửi dữ liệu:", error.message);
//       }
//     },
//     [formType]
//   );

//   //DELETE LISTNOTE
//   const deleteListNoteService = useCallback(async (deletedListId) => {
//     try {
//       await delList(deletedListId);
//     } catch (error) {
//       console.error("Error fetching listNote:", error.message);
//     }

//     context.setListNote((prevListNote) =>
//       prevListNote.filter((list) => list.id !== deletedListId)
//     );
//   }, []);

//   const handleListNoteClick = useCallback((listNote) => {
//     setFormTypeHandler("edit");
//     setListData(listNote);
//   }, []);

//   const handleAddFormListClick = (source) => {
//     setFormTypeHandler("add");
//     if (source === "button") {
//       setListForm(true);
//     }
//   };

//   const handleCancelClick = useCallback(() => {
//     setListForm(false);
//   }, []);

//   const handleListNoteItemClick = useCallback((listNote) => {
//     setReminders(true);
//     setSelectedListId(listNote.id);
//     setNameList(listNote.name);
//   }, []);

//   const handleBackList = () => {
//     setReminders(false);
//   };

//   const handleFormAddReminder = (openForm) => {
//     setReminderForm(openForm);
//   };

//   // update khi them moi trong form
//   const updateListNoteCount = (listId, newTotalCount) => {
//     context.setListNote((prevListNote) =>
//       prevListNote.map((list) =>
//         list.id === listId ? { ...list, totalCount: newTotalCount } : list
//       )
//     );
//   };

//   //update khi them moi va xoa trong remidner
//   const updateListTotalCount = (newTotalCount) => {
//     context.setListNote((prevListNote) =>
//       prevListNote.map((list) =>
//         list.id === selectedListId
//           ? { ...list, totalCount: newTotalCount }
//           : list
//       )
//     );
//   };

//   //update total co status la true
//   const updateTotalDone = (newTotalDone) => {
//     context.setListNote((prevListNote) =>
//       prevListNote.map((list) =>
//         list.id === selectedListId ? { ...list, totalDone: newTotalDone } : list
//       )
//     );
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const listData = await getAllList();
//         context.setListNote(listData);
//         await getColors();
//       } catch (error) {
//         console.error("Error loading data:", error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="menu-list-notes">
//         {loading && <Loading />}
//         <div className="menu-list-note" id="renderlist-home">
//           <h1>My List</h1>
//           {context.listNote.map((list) => (
//             <List
//               key={list.id}
//               onListNoteClick={handleListNoteClick}
//               onListDeleteSuccess={deleteListNoteService}
//               listNote={list}
//               onListNoteItemClick={handleListNoteItemClick}
//             />
//           ))}
//         </div>
//         <div className="button-home">
//           <Button
//             className="add-reminder btn__add--reminder"
//             onClick={() => handleFormAddReminder(true)}
//           >
//             New Reminder
//           </Button>

//           <Button
//             className="add-list"
//             id="add-list-new"
//             onClick={() => {
//               handleAddFormListClick("button");
//             }}
//           >
//             Add List
//           </Button>
//         </div>
//       </div>

//       {listForm && (
//         <ListForm
//           onCancelClick={handleCancelClick}
//           formType={formType}
//           listData={listData}
//           colors={colors}
//           onSubmitSuccess={addListServiceForm}
//           onSubEditForm={editListServiceForm}
//         />
//       )}

//       {reminders && (
//         <Reminders
//           onListsBackClick={handleBackList}
//           nameList={nameList}
//           selectedListId={selectedListId}
//           updateListTotalCount={updateListTotalCount}
//           updateTotalDone={updateTotalDone}
//           // reminders={reminders}
//         />
//       )}

//       {reminderForm && (
//         <ReminderForm
//           onCancelFormAdd={() => handleFormAddReminder(false)}
//           onSubmitAddReminderForm={() => handleFormAddReminder(false)}
//           updateListNoteCount={updateListNoteCount}
//         />
//       )}
//     </>
//   );
// }

// export default Lists;

///////////////////////////////////////////////////////////
import React, { useEffect, useState , useCallback} from "react";
import { useListsContext } from "../../store";
import {getListNote , createListNote , updateListNote , deleteListNote} from "../../actions/listNote.action";
import List from "./List";
import Button from "../core/Button";
import ListForm from "./ListForm";
import getColor from "../../fetchApi/fetchColor";
function ListContextEx() {
  const { state, dispatch } = useListsContext();
  const { listNote } = state;
  // const { listForm, formType, selectedListId } = state;
  const [listForm, setListForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [listData, setListData] = useState(null);
  const [colors, setColors] = useState([]);
  const setFormTypeHandler = (type) => {
    setListForm(type === "add" || type === "edit");
    setFormType(type);
  };
  const handleListNoteClick = useCallback((listNote) => {
    setFormTypeHandler("edit");
 
  }, []);
  const handleAddFormListClick = (source) => {
    setFormTypeHandler("add");
    if (source === "button") {
      setListForm(true);
    }
  };
  const handleCancelClick = useCallback(() => {
    setListForm(false);
  }, []);

  const getColors = async () => {
    try {
      const colorData = await getColor();

      setColors(colorData.map((colors) => colors.color));
    } catch (error) {
      console.error("Error fetching colorData:", error.message);
    }
  };


  const addListServiceForm = async (newList) => {
    try {
      if (formType === "add") {
        newList.totalDone = 0;
        newList.totalCount = 0;
        await createListNote(newList, dispatch);
        setListForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };
  

  //EDIT LISTNOTE

  const editListServiceForm = async (list) => {
    try {
      if (formType === "edit") {
        const updatedList = {
          id: list.id,
          name: list.name,
          isColor: list.isColor,
        };
        await updateListNote(list.id, updatedList, dispatch);
        setListForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error.message);
    }
  };
 
  // DELETE LISTNOTE
  const deleteListNoteService = async (deletedListId) => {
    try {
      await deleteListNote(deletedListId, dispatch);
    } catch (error) {
      console.error("Error fetching listNote:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getListNote()(dispatch);
        await getColors();
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
   <>
    <div className="menu-list-notes">
      {/* {loading && <Loading />} */}
        <div className="menu-list-note" id="renderlist-home">
       <h1>My List</h1>         
       {listNote.map((list) => (
            <List
              key={list.id}
              onListNoteClick={handleListNoteClick}
              onListDeleteSuccess={deleteListNoteService}
              listNote={list}
              // onListNoteItemClick={handleListNoteItemClick}
            />
          ))}
        </div>
        <div className="button-home">
          <Button
            className="add-reminder btn__add--reminder"
            // onClick={() => handleFormAddReminder(true)}
          >
            New Reminder
          </Button>

          <Button
            className="add-list"
            id="add-list-new"
            onClick={() => {
              handleAddFormListClick("button");
            }}
          >
            Add List
          </Button>
        </div>
      </div>
      {listForm && (
        <ListForm
          onCancelClick={handleCancelClick}
          formType={formType}
          listData={listData}
          colors={colors}
          onSubmitSuccess={addListServiceForm}
          onSubEditForm={editListServiceForm}
          setListForm={setListForm}
        />
        // <ComponentClass
        // formType={formType}
        //   listData={listData}
        // />
      )}
    </>
  );
}

export default ListContextEx;
