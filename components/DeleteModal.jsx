import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "./Spinner";
import { client } from "@/app/client";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

function DeleteBox({ isOpen, setIsOpen, id }) {
  let router = useRouter();
  let [err, setErr] = useState("");
  let [inputid, setId] = useState("");
  let [loading, setLoading] = useState(false);
  const handleDelete = () => {
    if (inputid !== id) {
      setErr("Wrong Id for this post.!");
      return;
    }
    setLoading(true);
    client
      .delete(id)
      .then(() => {
        setLoading(false);
        console.log("Bike deleted");
        router.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErr(err.message);
      });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white">
          <Dialog.Title>
            {" "}
            <div className="flex items-center justify-between"> <span className="font-bold "> Enter the Post Id to Delete</span>
            <button className="cursor-pointer bg-black text-white font-bold text-xl" onClick={()=>setIsOpen(false)}> <MdClose></MdClose></button>
           </div>
           
            {err && <span className="text-red-500"> {err} </span>}
          </Dialog.Title>
          {loading ? (
            <Spinner message="Deleting Post"></Spinner>
          ) : (
            <div className="flex justify-between items-center ">
              <input
                className="input"
                type="text"
                value={inputid}
                onChange={(e) => setId(e.target.value)}
                placeholder="svkjk2545kjkj3"
              />
              <button
                className="bg-red p-3 rounded-none text-white bg-red-500"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default DeleteBox;
