import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const Comment = ({comment, handleDelete}) => {
    return (
        <div className="flex justify-start items-start gap-2 mb-4">
            <span className="text-2xl mt-1"><FaUserCircle></FaUserCircle></span>
            <div className="bg-gray-200 p-2 rounded-md">
                <div className=" flex justify-between items-center gap-5">
                    <h2 className="font-semibold">{comment.name}</h2>
                    <button onClick={()=>handleDelete(comment._id)} className="text-sm text-red-500"><FaTrash/></button>
                </div>
                <p>{comment.body}
                </p>
            </div>
        </div>
    );
};

export default Comment;