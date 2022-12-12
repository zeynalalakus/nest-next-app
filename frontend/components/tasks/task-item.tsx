import {useRouter} from "next/router";
import {useContext} from "react";
import {TaskContext} from "../store/task-context";

export default function TaskItem(props: any) {
    const router = useRouter();
    const taskCtx = useContext(TaskContext);
    let topButtonPosition = 'justify-between'
    let showLeftArrow = true;
    let showRightArrow = true;
    if (props.status === 'Ready') {
        topButtonPosition = 'justify-end'
        showLeftArrow = false;
    } else if (props.status === 'Done') {
        topButtonPosition = 'justify-start'
        showRightArrow = false;
    }
    const topButtonDivClass = `card-actions ${topButtonPosition}`;

    const onNavigateEditTaskPage = () => {
        taskCtx.onSetActiveTask(props.task.id);
        router.push(`tasks/edit-task/`);
    }

    return (
        <div
            className="card w-[350px] h-auto mx-auto p-1 whitespace-normal text-center bg-secondary text-primary-content mb-3"
            draggable="true">
            <div className="card-body">
                <div className={topButtonDivClass}>
                    {showLeftArrow &&
                        <button onClick={() => props.onDowngradeStatus(props.task)} className="btn btn-square btn-primary btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>}
                    {showRightArrow &&
                        <button onClick={() => props.onUpgradeStatus(props.task)} className="btn btn-square btn-primary btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </button>}
                </div>
                <p>{props.title}</p>
                <div className="mt-3 card-actions justify-between align-middle">
                    <div className="avatar placeholder">
                        <div className="bg-primary text-white rounded-full w-8">
                            <span className="text-xs">{props.task.assignee.username[0]}</span>
                        </div>
                    </div>
                    <button className="btn btn-primary"
                           onClick={onNavigateEditTaskPage}>Details</button>
                </div>
            </div>
        </div>
    )
}
