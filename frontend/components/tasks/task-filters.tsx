import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../store/task-context";

export default function TaskFilters() {
    const taskCtx = useContext(TaskContext);
    const [assigneeFilter, setAssigneeFilter] = useState<any>('');
    const [reviewerFilter, setReviewerFilter] = useState<any>('');
    const [testerFilter, setTesterFilter] = useState<any>('');
    const [assigneeOptions, setAssigneeOptions] = useState<any>([]);
    const [reviewerOptions, setReviewerOptions] = useState<any>([]);
    const [testerOptions, setTesterOptions] = useState<any>([]);
    const allTasks = taskCtx.tasks;
    const filteredTasks = taskCtx.filteredTasks;
    useEffect(() => {
        const activeTasks = filteredTasks.filter((task: any) => task.status !== 'Backlog');
        console.log(activeTasks);
        activeTasks.forEach((task: any) => {
            setAssigneeOptions((prevState: any) => {
                if (!prevState.filter((option: any) => option.id === task.assignee.id)[0]) {
                    return [...prevState, task.assignee];
                }
                return [...prevState];
            })
            setReviewerOptions((prevState: any) => {
                if (!prevState.filter((option: any) => option.id === task.reviewer.id)[0]) {
                    return [...prevState, task.reviewer];
                }
                return [...prevState];
            })
            setTesterOptions((prevState: any) => {
                if (!prevState.filter((option: any) => option.id === task.tester.id)[0]) {
                    return [...prevState, task.tester];
                }
                return [...prevState];
            })

        })
    }, [filteredTasks]);
    const onChangeFilterHandler = (event: any, filterName: any, fn: any) => {
        const value = event.target.value;
        fn(value);
        taskCtx.onSetFilters(filterName, value);
    }
    return (
        <div className="flex flex-col gap-3 mx-5 p-5 text-white md:flex-row">
            <h1 className="text-3xl mr-3">Filters</h1>
            <div className="w-[200px]">
                <select value={assigneeFilter} className="select select-bordered w-full max-w-xs"
                        onChange={($event) => onChangeFilterHandler($event, 'assignee', setAssigneeFilter)}>
                    <option value="">All Assignees</option>
                    {assigneeOptions.map((assignee: any) => {
                        return <option key={assignee.id} value={assignee.id}>{assignee.username}</option>
                    })}
                </select>
            </div>

            <div className="w-[200px]">
                <select value={reviewerFilter} className="select select-bordered w-full max-w-xs"
                        onChange={($event) => onChangeFilterHandler($event, 'reviewer', setReviewerFilter)}>
                    <option value="">All Reviewer</option>
                    {reviewerOptions.map((reviewer: any) => {
                        return <option key={reviewer.id} value={reviewer.id}>{reviewer.username}</option>
                    })}
                </select>
            </div>

            <div className="w-[200px]">
                <select value={testerFilter} className="select select-bordered w-full max-w-xs"
                        onChange={($event) => onChangeFilterHandler($event, 'tester', setTesterFilter)}>
                    <option value="">All Testers</option>
                    {testerOptions.map((tester: any) => {
                        return <option key={tester.id} value={tester.id}>{tester.username}</option>
                    })}
                </select>
            </div>

        </div>
    )
}
