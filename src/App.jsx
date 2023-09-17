import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Buttons from "./Components/Buttons";
import { colors } from "@mui/material";

function App() {
  let [todo_main_input, set_todo_main_input] = useState("");
  let [uiShow, setuiShow] = useState([]);
  let [uishowinput, setuishowinput] = useState("");

  const add_todo = () => {
    if (todo_main_input.length == 0) {
      alert("Cannot enter empty todo")
    }
    else {
      let todo_obj = {
        value: todo_main_input,
        isEdit: false,
        isComplete: false,
      };
      setuiShow([...uiShow, todo_obj]);
      set_todo_main_input("");
    }

  };

  const delall_todo = () => {
    setuiShow([]);
  };

  const del_element_todo = (index) => {
    uiShow.splice(index, 1);
    setuiShow([...uiShow]);
  };

  const edit_todo = (index) => {
    uiShow.forEach((element) => {
      element.isEdit = false;
    });

    uiShow[index].isEdit = true;
    setuiShow([...uiShow]);

    setuishowinput(uiShow[index].value);
  };

  const Completed_todo = (index) => {
    if (uiShow[index].isComplete == false) {
      uiShow[index].isComplete = true;
      setuiShow([...uiShow]);
    } else {
      uiShow[index].isComplete = false;
      setuiShow([...uiShow]);
    }
  };

  const save_edited_todo = (index) => {
    uiShow[index].isEdit = false;

    setuiShow([...uiShow]);
    if (uishowinput.length == 0) {
      alert("cannot pass empty string")
    }
    else {
      uiShow[index].value = uishowinput;
      setuiShow([...uiShow]);
    }

  };


  return (
    <>

      <div className="text-center font-bold text-3xl p-5 bg-blue-600">Todo Application</div>

      <section className="flex flex-col items-center justify-center gap-2 ">
        <div className="w-[90%] md:w-[60%] lg:w-[40%] mt-5">
          <TextField
            id="filled-basic"
            label="Enter Todo"
            variant="filled"
            className="w-[100%] "
            value={todo_main_input}
            onChange={(e) => {
              set_todo_main_input(e.target.value);
            }}
          />
        </div>

        <div className="flex gap-2">
          <Buttons
            value="ADD TODO"
            variant="contained"
            trigger={add_todo} />

          <Buttons
            value="DELETE ALL"
            trigger={delall_todo}
            variant="contained"
            colors="error" />

        </div>

        {uiShow.map((element, index) =>
          element.isComplete ? (
            <section
              className="flex gap-2 border border-slate-500 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="flex gap-2  p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between">
                {element.value}
              </div>
              <div className="flex gap-2">
                <Buttons
                  value="INCOMPLETE"
                  trigger={() => {
                    Completed_todo(index);
                  }}
                  variant="contained"
                  colors="secondary"
                />
                <Buttons
                  value="DELETE"
                  trigger={() => {
                    del_element_todo(index);
                  }}
                  variant="contained"
                  colors="error"
                />
              </div>
            </section>
          ) : element.isEdit ? (
            <section
              className="flex gap-2 border border-gray-500 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="w-[80%] overflow-x-scroll ml-[5px]">
                {" "}
                <TextField
                  className="w-[100%]"
                  id="standard-basic"
                  label="Edit todo"
                  variant="standard"
                  value={uishowinput}
                  onChange={(e) => {
                    setuishowinput(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center  w-[20%]">
                <Buttons
                  value="SAVE"
                  trigger={() => {
                    save_edited_todo(index);
                  }}
                  colors="primary"
                  variant="contained"
                />

              </div>
            </section>
          ) : (
            <section
              className="flex gap-2 border border-gray-700 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="w-[40%] overflow-x-scroll ml-[5px]">
                {element.value}
              </div>
              <div className="flex gap-1 flex-wrap justify-center w-[60%]">
                <Buttons
                  value="EDIT"
                  trigger={() => {
                    edit_todo(index);
                  }}
                  variant="contained"
                />
                <Buttons
                  value="DELETE"
                  trigger={() => {
                    del_element_todo(index);
                  }}
                  colors="error"
                  variant="contained"

                />
                <Buttons
                  value="COMPLETE"
                  trigger={() => {
                    Completed_todo(index);
                  }}
                  colors="secondary"
                  variant="contained"
                />
              </div>
            </section>
          )
        )}
      </section>
    </>
  );
}

export default App;
